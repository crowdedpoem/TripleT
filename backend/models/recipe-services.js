
// const Recipe = require('./recipe.js')
// const get = require('../token-service.mjs')
// const productFunction = require('../product.mjs')
// const locationFunction = require('../location.mjs') 
// const scrape = require('../density-scrape.mjs')
// const mongoose = require('mongoose')
import Recipe from './recipe.js';
import get from '../token-service.mjs'
import productFunction from '../product.mjs'
import locationFunction from '../location.mjs'
import scrape from '../density-scrape.mjs'
import mongoose from 'mongoose'

let dbConnection;

function setConnection(newConn){
  dbConnection = newConn;
  return dbConnection;
}

mongoose.set("debug", true);
// refactor to create a connectino using function
function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose
  .createConnection("mongodb+srv://TripleT:%21RecipeBuddy%21@recipe.m0n81de.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  }
  return dbConnection;
}


export async function getRecipe(title, ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe)
  let result;
  if (title === undefined && ingredient === undefined) {
    result = await RecipeModel.find();
  } else if (title && !ingredient) {
    result = await findRecipeByTitle(title);
  } else if (ingredient && !title) {
    result = await findRecipeByIngredient(job);
  } else {
    result = await findRecipeByTitleAndIngredient(title, ingredient);
  }
  return result;
}

export async function findRecipeById(id) {
  try {
    console.log(await Recipe.findById(id));
    return await Recipe.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
export async function updateRecipeByID(id, requestBody) {
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

function standardize(num, unit) {
  var mult = {
    tsp: "1",
    tbsp: "3",
    "fl oz": "6",
    cup: "48",
    pint: "96",
    quart: "192",
    gallon: "768",
    oz: "1",
    lb: "16",
    ct: "1",
  };

  var base = {
    tsp: "tsp",
    tbsp: "tsp",
    "fl oz": "tsp",
    cup: "tsp",
    pint: "tsp",
    quart: "tsp",
    gallon: "tsp",
    oz: "oz",
    lb: "oz",
    ct: "ct",
  };

  return [num * mult[unit], base[unit]];
}

export async function getPrice(item, stanInput, zipCode) {
  console.log("get price has " + item);
  try {
    // got access token
    let tokenBody = "grant_type=client_credentials&scope=product.compact";
    let res = await get(tokenBody);
    let accessToken = res.access_token;
    // use the token to do location search near the zipcode
    let locationRes = await locationFunction(zipCode, accessToken);
    let locationId = locationRes.data[0].locationId;

    // ues the token to do product detail search
    let productRes = await productFunction(item, accessToken, locationId);

    let price = productRes.data[0].items[0].price.regular;
    let unit = productRes.data[0].items[0].size;

    let amount = unit.split(" ")[0];
    let unitVal = unit.split(" ")[1];

    let stanKroger = standardize(amount, unitVal);
    console.log("The price of |" + unit + "| == " + price);
    console.log(stanKroger);
    console.log(stanInput);
    // let rate = price / (amount * mult[unitVal]);
    if (stanInput[1] == stanKroger[1]) {
      let rate = (price / stanKroger[0]) * stanInput[0];
      return rate;
    } else {
      if (stanInput[1] == "ct") {
        return price * stanInput[1];
      }
      console.log("need density conversion for " + item);
      let ozToCup = await scrape(item);
      const ozToTsp = ozToCup / 48;
      console.log("density oz to cup is " + ozToCup);
      if (stanKroger[1] == "oz") {
        return (price / stanKroger[0]) * ozToTsp * stanInput[0];
      } else {
        return ((price / stanKroger[0]) * stanInput[0]) / ozToTsp;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export async function addRecipe(recipe) {
  const servings = recipe["servings"];
  try {
    let recipeToAdd = new Recipe(recipe);
    // zip code that works: 93401
    let totalPrice = 0;
    console.log("here is ingredients: " + recipe.ingredients);
    for (let ing in recipeToAdd.ingredients) {
      let name = recipe.ingredients[ing].name;
      let unit = recipe.ingredients[ing].unit;
      let size = recipe.ingredients[ing].size;
      console.log("line 105 unit is " + unit + " and amount is " + size);
      let base = standardize(size, unit);

      let addThis = await getPrice(name, base, "93401");

      console.log(name + " costs $" + addThis);
      totalPrice += addThis;
    }
    if (servings > 0) {
      recipeToAdd["price"] = totalPrice / servings;
    } else {
      recipeToAdd["price"] = totalPrice;
    }

    const savedRecipe = await recipeToAdd.save();
    return savedRecipe;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteRecipeById(id) {
  return await Recipe.findByIdAndDelete(id);
}

export async function findRecipeByTitle(title) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema)
  return await RecipeModel.find({ title: title });
}

export async function findRecipeByIngredient(ingredient) {
  return await Recipe.find({ ingredient: ingredient });
}

export async function findRecipeByTitleAndIngredient(title, ingredient) {
  return await Recipe.find({ title: title, ingredient: ingredient });
}

// export {addRecipe};
// export {getRecipe};
// export {findRecipeById};
// export {findRecipeByTitle};
// export {deleteRecipeById};
// export {findRecipeByIngredient};
// export {findRecipeByTitleAndIngredient};
// module.exports={addRecipe, getRecipe, findRecipeById, findRecipeByTitle, deleteRecipeById, findRecipeByIngredient, findRecipeByTitleAndIngredient, setConnection, getDbConnection}