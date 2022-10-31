const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {

            title:{
              type:String,
              required: true,
              trim: true
            },
            servings:{
              type:Number,
              required: true,
              trim: true
            },
            blurb:{
              type:String,
              required: true,
              trim: true
            },
            totalTime: {
                active:{
                  type:Number,
                  required: true,
                  trim: true
                },
                cook:{
                  type:Number,
                  required: true,
                  trim: true
                }
            },
            ingredients: [
              {
                name: {
                  type:String,
                  required: true,
                  trim: true
                },
                amount:{
                  type:Number,
                  required: true,
                  trim: true
                },
                substitute: {
                  type:String,
                  required: true,
                  trim: true
                }
              }
            ], //first index, name, amount, 
            steps: [
                {
                  type:String,
                  required: true,
                  trim: true
                }
            ]
        },
    
  { collection: "recipes_list" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
