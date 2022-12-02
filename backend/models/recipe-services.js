
const Recipe = require('./recipe.js')
const tokGet = require('../token-service.js')
const productFunction = require('../product.js')
const locationFunction = require('../location.js') 
const scrape = require('../density-scrape.js')
const mongoose = require('mongoose')
// const env = require('.env')
const RecipeSchema = require('./recipe.js')

// import Recipe from './recipe.js';
// import get from '../token-service.mjs'
// import productFunction from '../product.mjs'
// import locationFunction from '../location.mjs'
// import scrape from '../density-scrape.mjs'
// import mongoose from 'mongoose'

let dbConnection;

function setConnection(newConn){
  dbConnection = newConn;
  return dbConnection;
}

mongoose.set("debug", true);
// refactor to create a connectino using function
//TODO add env variable
//TODO incorporate node env
function getDbConnection() {
  if (!dbConnection) {
    //TODO here is mongo db key

    dbConnection = mongoose
  .createConnection("mongodb+srv://TripleT:%21RecipeBuddy%21@recipe.m0n81de.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  }
  return dbConnection;
}


async function getRecipe(title, ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe)
  let result;
  if (title === undefined && ingredient === undefined) {
    result = await RecipeModel.find();
  } else if (title && !ingredient) {
    result = await findRecipeByTitle(title);
  } else if (ingredient && !title) {
    result = await findRecipeByIngredient(ingredient);
  } else {
    result = await findRecipeByTitleAndIngredient(title, ingredient);
  }
  return result;
}

async function findRecipeById(id) {
  try {
    console.log(await Recipe.findById(id));
    return await Recipe.findById(id);
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

function standardize(num, unit) {
  console.log("before standardizing " + num + " " + unit)
  var mult = {
    tsp: "1",
    tbsp: "3",
    floz: "6",
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
    floz: "tsp",
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
// test general things about getPrice (range, type of num)
// test when we know conversions, hard to match prices
// write a note, this file does api fetch and we didn't cover
async function getPrice(item, stanInput, zipCode) {
  console.log("get price has " + item);
  try {
    // got access token
    let tokenBody = "grant_type=client_credentials&scope=product.compact";
    let res = await tokGet.get(tokenBody);
    let accessToken = res.access_token;
    // use the token to do location search near the zipcode
    let locationRes = await locationFunction.getLocations(zipCode, accessToken);
    let locationId = locationRes.data[0].locationId;

    // ues the token to do product detail search
    let productRes = await productFunction.getProducts(item, accessToken, locationId);

    console.log(productRes.data[0].items[0])
    let price = productRes.data[0].items[0].price.regular;
    let unit = productRes.data[0].items[0].size;

    let amount = unit.split(" ")[0];
    let unitVal = unit.split(" ")[1];

    let stanKroger = standardize(amount, unitVal);
    console.log("The price of |" + unit + "| == " + price);
    console.log( stanKroger);
    console.log( stanInput);
    // let rate = price / (amount * mult[unitVal]);
    if (stanInput[1] == stanKroger[1]) {
      let rate = (price / stanKroger[0]) * stanInput[0];
      return rate;
    } else {
      if (stanInput[1] == "ct") {
        return price * stanInput[1];
      }
      //TODO break up function, probably along else block
      //try to run test case for getprice(), see if github runs
      // scrape and api are apart of models
      // azure should look like api with endpoints
      // frontend makes calls to azure url not local 
      console.log("need density conversion for " + item);
      let ozToCup = await scrape.scrape(item);
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


async function addRecipe(recipe) {
  const model = getDbConnection().model("Recipe", Recipe)
  const servings = recipe["servings"];
  let totalPrice = 0;
  try {
    let recipeToAdd = new model(recipe);
    
    for (let ing in recipe.ingredients) {
      console.log(recipe.ingredients[ing].name + " is " + JSON.stringify(recipe.ingredients[ing]))
      let name = recipe.ingredients[ing].name;
      let unit = recipe.ingredients[ing].unit;
      let amount = recipe.ingredients[ing].size;
      let base = standardize(amount, unit);
      console.log(unit )
      console.log(amount)
      console.log("base is " + base)
      let addThis = await getPrice(name, base, "93401");
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

async function deleteRecipeById(id) {
  return await Recipe.findByIdAndDelete(id);
}

 async function findRecipeByTitle(title) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema)
  return await RecipeModel.find({ title: title });
}

 async function findRecipeByIngredient(ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema)
  return await RecipeModel.find({ ingredient: ingredient });
}

 async function findRecipeByTitleAndIngredient(title, ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema)
  return await RecipeModel.find({ title: title, ingredient: ingredient });
}

//TODO env file mongo db

module.exports={addRecipe, getRecipe, findRecipeById, findRecipeByTitle, deleteRecipeById, findRecipeByIngredient, findRecipeByTitleAndIngredient, setConnection, getDbConnection, standardize, getPrice}