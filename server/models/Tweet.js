import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Add a tweet type"],
      enum: {
        values: ["tweet", "reply"],
        message: "{VALUE} is not supported as a type",
      },
    },
    content: {
      type: String,
      required: [
        function () {
          // findByIdAndUpdate causes this.media to be undefined
          return this.media ? this.media.length === 0 : true;
        },
        "Add a tweet content",
      ],
      maxlength: [280, "Tweet content must be shorter than 280 characters"],
      trim: true,
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    media: {
      type: [{ mediaType: String, url: String }],
      // If media doesn't provide, it will be undefined
      validate: [
        media => media.length <= 4,
        `Media can't be more than 4 items`,
      ],
    },
    tweetId: {
      type: mongoose.Types.ObjectId,
      required: function () {
        return this.type === "reply";
      },
      ref: "Tweet",
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be a negative number"],
    },
    retweets: {
      type: Number,
      default: 0,
      min: [0, "Retweets cannot be a negative number"],
    },
    replies: {
      type: Number,
      default: 0,
      min: [0, "Replies cannot be a negative number"],
    },
    updatesLeft: {
      type: Number,
      default: 3,
      min: 0,
      max: 3,
    },
  },
  { timestamps: true }
);

TweetSchema.statics.updateTweetReplies = async function (tweetId, number) {
  await this.model("Tweet").updateOne(
    { _id: tweetId },
    { $inc: { replies: number } }
  );
};

TweetSchema.pre("save", function (next) {
  if (this.type === "tweet") return next();
  return this.constructor.updateTweetReplies(this.tweetId, 1);
});

TweetSchema.pre("deleteOne", { document: true }, function (next) {
  if (this.type === "tweet") return next();
  return this.constructor.updateTweetReplies(this.tweetId, -1);
});

// Cascade Deleting - delete tweet reactions
TweetSchema.post("deleteOne", { document: true }, function () {
  return this.model("Reaction").deleteMany({ tweetId: this._id });
});

export default mongoose.model("Tweet", TweetSchema);
