const mongoose = require("mongoose");
const { findByIdAndDelete } = require("./recipe");
const recipeModel = require("./recipe");

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://TripleT:%21RecipeBuddy%21@recipe.m0n81de.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getRecipe(title, ingredient) {
  let result;
  if (title === undefined && ingredient === undefined) {
    result = await recipeModel.find();
  } else if (title && !ingredient) {
    result = await findRecipeByTitle(title);
  } else if (ingredient && !title) {
    result = await findRecipeByIngredient(job);
  } else {
    result = await findRecipeByTitleAndIngredient(title, ingredient);
  }
  return result;
}

async function findRecipeById(id) {
  try {
    // console.log(await recipeModel.findById(id))
    return await recipeModel.findById(id);

  } catch (error) {
    console.log(error);
    return undefined;
  }
}
async function updateRecipeByID(id, requestBody) {
  try {
    const result = await recipeModel.findById(id);
    // console.log(result);
    const updatedRecipe = await result.updateOne(requestBody);
    return updatedRecipe;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function addRecipe(recipe) {
  try {
    const recipeToAdd = new recipeModel(recipe);
    console.log(recipeToAdd);
    const savedRecipe = await recipeToAdd.save();
    return savedRecipe;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteRecipeById(id) {
  return await recipeModel.findByIdAndDelete(id).then();
}

async function findRecipeByTitle(title) {
  return await recipeModel.find({ title: title });
}

async function findRecipeByIngredient(ingredient) {
  return await recipeModel.find({ ingredient: ingredient });
}

async function findRecipeByTitleAndIngredient(title, ingredient) {
  return await recipeModel.find({ title: title, ingredient: ingredient });
}

exports.getRecipe = getRecipe;
exports.findRecipeByTitle= findRecipeByTitle;
exports.addRecipe = addRecipe;
exports.deleteRecipe = deleteRecipeById;
exports.findRecipeByIngredient = findRecipeByIngredient;
exports.findRecipeByTitleAndIngredient = findRecipeByTitleAndIngredient;
exports.findRecipeById = findRecipeById;
exports.deleteRecipeById = deleteRecipeById;
exports.updateRecipeByID = updateRecipeByID;