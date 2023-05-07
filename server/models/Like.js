import mongoose from "mongoose";
import Tweet from "./Tweet.js";

const LikeSchema = new mongoose.Schema(
  {
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

// Prevent user from adding more than one like per tweet
LikeSchema.index({ tweetId: 1, authorId: 1 });

LikeSchema.statics.updateTweetLikes = async function (tweetId, number) {
  await this.model("Tweet").updateOne(
    { _id: tweetId },
    { $inc: { likes: number } }
  );
};

LikeSchema.pre("save", function (next) {
  return this.constructor.updateTweetLikes(this.tweetId, 1);
});

LikeSchema.pre("deleteOne", { document: true }, function (next) {
  return this.constructor.updateTweetLikes(this.tweetId, -1);
});

export default mongoose.model("Like", LikeSchema);
