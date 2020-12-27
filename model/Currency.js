const mongoose = require("mongoose");
const { Schema } = mongoose;
const currencySchema = new Schema(
  {
    currencyName: String,
    currencyCode: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const currencyModel = mongoose.model("currency", currencySchema);
module.exports = currencyModel;
