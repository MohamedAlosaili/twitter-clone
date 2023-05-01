import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB connected successfully ✅".cyan.bold);
};

export default connectDB;
