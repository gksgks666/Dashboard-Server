const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ErrorLogSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    domain: {
      type: String,
    },
    requestValue: {
      type: String,
    },
    apiEndpoint: {
      type: String,
    },
    apiMethod: {
      type: String,
    },
    responseValue: {
      type: String,
    },
    stackTrace: {
      type: String,
    },
  },
  { timestamps: true }
);

const ErrorLog = mongoose.model("errorlog", ErrorLogSchema);

module.exports = ErrorLog;
