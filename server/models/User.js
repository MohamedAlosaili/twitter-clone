import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add a name"],
      maxlength: [50, "Your name must be shorter than 50 characters"],
      minlength: [1, "Your name must be longer than 1 characters"],
      trim: true,
      match: [/^(?!.*twitter).*$/i, `Name can't include "twitter"`],
    },
    username: {
      type: String,
      unique: [true, "Username has been taken. Please choose another"],
      required: [true, "Username can't be blank"],
      maxlength: [15, "Your username must be shorter than 15 characters"],
      minlength: [4, "Your username must be longer than 4 characters"],
      trim: true,
      lowercase: true,
      match: [
        /^(?!.*twitter)[a-zA-Z0-9_]+$/,
        "Your username can only contain letters, numbers and '_'",
      ],
    },
    email: {
      type: String,
      required: [true, "Email can't be blank"],
      unique: [true, "Email has already been taken"],
      match: [
        /^[\w-\.]{1,64}@([\w-]+\.)+[\w-]{2,}$/,
        "Please Enter a valid email",
      ],
      lowercase: true,
      trim: true,
    },
    avatar: String,
    headerImage: String,
    bio: {
      type: String,
      maxlength: [160, "Your bio must be shorter than 160 characters"],
    },
    location: {
      type: String,
      maxlength: [30, "Your location must be shorter than 30 characters"],
    },
    website: {
      type: String,
      match: [
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        "Please enter a valid URL",
      ],
      maxlength: [100, "Your website URL must be shorter than 100 characters"],
    },
    birthday: Date,
    // TODO: pinTweet property
    // TODO: Reset properties
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
