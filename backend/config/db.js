const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Successfully connected to the database`);
  } catch (err) {
    console.log("errror in connecting database", err);
    // process.exit();
  }
};

module.exports = connectDB;
