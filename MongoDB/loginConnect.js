import mongoose from "mongoose";

const loginConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,                 
      serverSelectionTimeoutMS: 5000,  
    });

    console.log(" MongoDB Connected Successfully");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default loginConnectDB;
