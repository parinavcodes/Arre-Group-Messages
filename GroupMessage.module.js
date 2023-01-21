const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupMessage = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const GroupMessage = mongoose.model("GroupMessage", groupMessage);

module.exports = GroupMessage;
