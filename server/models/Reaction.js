import mongoose from "mongoose";
import ErrorResponse from "../utils/errorResponse.js";

const ReactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Add reaction type"],
      enum: {
        values: ["like", "retweet"],
        message: "{VALUE} not supported as a reaction type",
      },
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tweetId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);

// Prevent user from adding more than one like/retweet per tweet
// Prevent increasing if there is a duplicate doc - index not preventing increasing
ReactionSchema.pre("validate", async function (next) {
  const reaction = await this.constructor.findOne({
    type: this.type,
    authorId: this.authorId,
    tweetId: this.tweetId,
  });

  if (reaction) {
    return next(new ErrorResponse(`Duplicate ${this.type} found`, 400));
  }
});

ReactionSchema.statics.updateTweetReaction = async function (
  tweetId,
  type,
  number
) {
  await this.model("Tweet").updateOne(
    { _id: tweetId },
    { $inc: { [type + "s"]: number } }
  );
};

ReactionSchema.pre("save", function (next) {
  return this.constructor.updateTweetReaction(this.tweetId, this.type, 1);
});

ReactionSchema.pre("deleteOne", { document: true }, function (next) {
  return this.constructor.updateTweetReaction(this.tweetId, this.type, -1);
});

export default mongoose.model("Reaction", ReactionSchema);
