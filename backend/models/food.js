const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: false,
    },
    size: {
      type: String,
      required: false,
      trim: false,
    },
  },
  { collection: "food_list" },
);

module.exports = FoodSchema;
