const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name:String,
    amount:Number,
    substitute:String
  }
);
const totalTimeSchema = new mongoose.Schema(
{
  active:Number,
    cook:Number  
}
);
const RecipeSchema = new mongoose.Schema(
  {
            title:String,
            servings:Number,         
            blurb:String,
            totalTime: totalTimeSchema,
            ingredients: [ingredientSchema], //first index, name, amount, 
            steps: [String],
            urlSource: String,
        },
    //will need to add user that the recipe belongs to
    //add in amount of favorites/likes
  { collection: "recipes_list" }
);


module.exports = RecipeSchema;
