import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
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
ReactionSchema.index({ type: 1, authorId: 1, tweetId: 1 }, { unique: true });

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
