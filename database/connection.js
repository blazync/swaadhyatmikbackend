import mongoose from "mongoose";
import "dotenv/config";


const connect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("Mongo DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;
