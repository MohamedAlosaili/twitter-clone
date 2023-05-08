import mongoose from "mongoose";
import ErrorResponse from "../utils/errorResponse.js";

const FollowSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent user from follow himself
FollowSchema.pre("validate", function (next) {
  if (this.followerId.toString() === this.followingId.toString()) {
    return next(
      new ErrorResponse(
        "Invalid follow request. User cannot follow himself",
        400
      )
    );
  }
  next();
});

// I added pre(validate) hook instead of index, because index doesn't stop other
// pre hooks which cause inconsistency in followers/following user properties number
FollowSchema.pre("validate", async function (next) {
  const follow = await this.constructor.findOne({
    followerId: this.followerId,
    followingId: this.followingId,
  });

  if (follow) {
    return next(new ErrorResponse("Duplicate follow relationship found", 400));
  }
});

FollowSchema.statics.updateFollowStatus = async function (
  followerId,
  followingId,
  number
) {
  await this.model("User").updateOne(
    { _id: followerId },
    { $inc: { following: number } }
  );
  await this.model("User").updateOne(
    { _id: followingId },
    { $inc: { followers: number } }
  );
};

FollowSchema.pre("save", async function (next) {
  return this.constructor.updateFollowStatus(
    this.followerId,
    this.followingId,
    1
  );
});

FollowSchema.pre("deleteOne", { document: true }, function (next) {
  return this.constructor.updateFollowStatus(
    this.followerId,
    this.followingId,
    -1
  );
});

export default mongoose.model("Follow", FollowSchema);
