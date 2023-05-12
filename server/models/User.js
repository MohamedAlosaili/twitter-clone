import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be blank"],
      maxlength: [50, "Your name must be shorter than 50 characters"],
      minlength: [1, "Your name must be longer than 1 characters"],
      trim: true,
      match: [/^(?!.*twitter).*$/i, `Name can't include "twitter"`],
    },
    accountType: {
      type: String,
      enum: ["google", "regular"],
      default: "regular",
      select: false,
    },
    username: {
      type: String,
      unique: true,
      required: [
        function () {
          const isRequired = this.accountType !== "google";
          return isRequired;
        },
        "Username can't be blank",
      ],
      maxlength: [15, "Your username must be shorter than 15 characters"],
      minlength: [1, "Your username must be longer than 1 character"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
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
      select: false,
    },
    password: {
      type: String,
      required: [true, "Password can't be blank"],
      minlength: [8, "Your password must be longer than 8 characters"],
      maxlength: [32, "Your password must be shorter than 32 characters"],
      select: false,
    },
    avatar: {
      type: String,
      default: "default-avatar.png",
      // It's handled by the client
    },
    header: String,
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
    followers: {
      type: Number,
      default: 0,
      min: [0, "Followers cannot be a negative number"],
    },
    following: {
      type: Number,
      default: 0,
      min: [0, "Following cannot be a negative number"],
    },
    // TODO: pinTweet property
    resetPasswordCode: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// Extract username from email if not provided
UserSchema.pre("save", function (next) {
  if (this.username) return next();

  const username = this.email.split("@")[0].replace(/[^a-zA-Z0-9_]+/g, "");
  this.username = username;
  next();
});

// Hash password before save it
UserSchema.pre("save", async function (next) {
  if (!this.password) return next();

  const hashedPassword = await bcrypt.hash(this.password, 10);

  this.password = hashedPassword;
});

// Check if password matches
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and return JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default mongoose.model("User", UserSchema);
