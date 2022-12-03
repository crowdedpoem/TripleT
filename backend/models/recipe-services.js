const Recipe = require("./recipe.js");
const tokGet = require("../token-service.js");
const productFunction = require("../product.js");
const locationFunction = require("../location.js");
const scrape = require("../density-scrape.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

mongoose.set("debug", true);
// refactor to create a connectino using function

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

async function getRecipe(title, ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe);
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
  const RecipeModel = getDbConnection().model("Recipe", Recipe);
  try {
    return await RecipeModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

function standardize(num, unit) {
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
  try {
    // got access token
    let tokenBody = "grant_type=client_credentials&scope=product.compact";
    let res = await tokGet.get(tokenBody);
    let accessToken = res.access_token;
    // use the token to do location search near the zipcode
    let locationRes = await locationFunction.getLocations(zipCode, accessToken);
    let locationId = locationRes.data[0].locationId;

    // ues the token to do product detail search
    let productRes = await productFunction.getProducts(
      item,
      accessToken,
      locationId,
    );

    let price = productRes.data[0].items[0].price.regular;
    let unit = productRes.data[0].items[0].size;

    let amount = unit.split(" ")[0];
    let unitVal = unit.split(" ")[1];
    if (unitVal == "fl") {
      unitVal = "floz";
    }

    let stanKroger = standardize(amount, unitVal);

    if (stanInput[1] == stanKroger[1]) {
      let rate = (price / stanKroger[0]) * stanInput[0];
      return rate;
    } else {
      let ozToCup = await scrape.scrape(item);
      const ozToTsp = ozToCup / 48;

      if (stanKroger[1] == "oz") {
        return (price / stanKroger[0]) * ozToTsp * stanInput[0];
      } else {
        return ((price / stanKroger[0]) * stanInput[0]) / ozToTsp;
      }
    }
  } catch (err) {
    console.log(err);
    return Error("Error");
  }
}

async function addRecipe(recipe) {
  const model = getDbConnection().model("Recipe", Recipe);
  const servings = recipe["servings"];
  let totalPrice = 0;
  try {
    let recipeToAdd = new model(recipe);

    for (let ing in recipe.ingredients) {
      let name = recipe.ingredients[ing].name;
      let unit = recipe.ingredients[ing].unit;
      let amount = recipe.ingredients[ing].size;
      let base = standardize(amount, unit);

      let addThis = await getPrice(name, base, "93401");
      totalPrice += addThis;
    }

    recipeToAdd["price"] = totalPrice / servings;

    const savedRecipe = await recipeToAdd.save();
    return savedRecipe;
  } catch (error) {
    console.log(error);
    return Error("error");
  }
}

async function deleteRecipeById(id) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema);
  return await RecipeModel.findByIdAndDelete(id);
}

async function findRecipeByTitle(title) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema);
  return await RecipeModel.find({ title: title });
}

async function findRecipeByIngredient(ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema);
  return await RecipeModel.find({ ingredient: ingredient });
}

async function findRecipeByTitleAndIngredient(title, ingredient) {
  const RecipeModel = getDbConnection().model("Recipe", Recipe.RecipeSchema);
  return await RecipeModel.find({ title: title, ingredient: ingredient });
}

module.exports = {
  addRecipe,
  getRecipe,
  findRecipeById,
  findRecipeByTitle,
  deleteRecipeById,
  findRecipeByIngredient,
  findRecipeByTitleAndIngredient,
  setConnection,
  getDbConnection,
  standardize,
  getPrice,
  deleteRecipeById,
};
