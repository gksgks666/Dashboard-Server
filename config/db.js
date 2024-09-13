const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("mongoDB connect...");
  } catch (error) {
    console.log(`${error} did not connect`);
    process.exit(1);
  }
};
