const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: false,
      trim: true,
    },
    servings: {
      type: Number,
      required: false,
      trim: true,
    },
    blurb: {
      type: String,
      required: false,
      trim: true,
    },
    totalTime: {
      active: {
        type: Number,
        required: false,
        trim: true,
      },
      cook: {
        type: Number,
        required: false,
        trim: true,
      },
    },
    ingredients: [
      {
        name: {
          type: String,
          required: false,
          trim: true,
        },
        size: {
          type: Number,
          required: false,
          trim: true,
        },
        unit: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ], //first index, name, amount,
    steps: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    urlSource: {
      type: String,
      required: false,
      trim: false,
    },
    image: {
      type: String,
      required: false,
    },
    cost: {
      total: Number,
      perServing: Number,
    },
    user: {
      type: String,
      required: false,
      trim: true,
    },
    bookmarkCount: {
      type: Number,
    },
  },
  //will need to add user that the recipe belongs to
  //add in amount of favorites/likes
  { collection: "recipes_list" },
);

// check how recipe js export is used, need to create mongoose model
module.exports = RecipeSchema;
