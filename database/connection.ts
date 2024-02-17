import mongoose from "mongoose";

export const ConnectToDB = async () => {
  if (!process.env.MONGODB_URI) {
    return console.log("Please set your MONGODB_URI environment variable.");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
  }
};
