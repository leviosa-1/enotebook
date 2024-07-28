const mongoose = require("mongoose");
const mongoose_URI = "mongodb://localhost:27017/enotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoose_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
