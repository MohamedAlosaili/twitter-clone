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
    likes: {
      type: Number,
      default: 0,
    },
    retweets: {
      type: Number,
      default: 0,
    },
    replies: {
      type: Number,
      default: 0,
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

export default mongoose.model("Tweet", TweetSchema);