const mongoose = require("mongoose");

// import mongoose from 'mongoose'
const RecipeSchema = require("./recipe.js");
const recipeServices = require("./recipe-services.js");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let recipeModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  recipeModel = conn.model("Recipe", RecipeSchema);

  recipeServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyRecipe = {
    title: "hotdog",
    servings: 3,
    blurb: "best hotdog",
    totalTime: {
      active: 1,
      cook: 1,
    },
    ingredients: [
      {
        name: "hotdog",
        amount: 2,
      },
      {
        name: "bun",
        amount: 2,
      },
    ],
    steps: ["first boil noodle", "make cheese sauce", "eat"],
    urlSource:
      "https://playswellwithbutter.com/wp-content/uploads/2022/05/Grilled-Hot-Dogs-How-to-Grill-Hot-Dogs-38.jpg",
    cost: {
      total: 6.67,
      perServing: 1.48,
    },
  };
  let result = new recipeModel(dummyRecipe);
  await result.save();

  dummyRecipe = {
    title: "waffle fries",
    servings: 3,
    blurb: "crispy fries",
    totalTime: {
      active: 5,
      cook: 15,
    },
    ingredients: [
      {
        name: "potato",
        amount: 2,
      },
      {
        name: "salt",
        amount: 2,
      },
    ],
    steps: ["make waffle batter", "fry waffles", "eat"],
    urlSource: "https://data.thefeedfeed.com/recommended/post_4483926.jpeg",
    cost: {
      total: 4.67,
      perServing: 0.68,
    },
  };
  result = new recipeModel(dummyRecipe);
  await result.save();

  dummyRecipe = {
    title: "curry",
    servings: 3,
    blurb: "yum",
    totalTime: {
      active: 2,
      cook: 60,
    },
    ingredients: [
      {
        name: "rice",
        amount: 2,
      },
      {
        name: "chicken",
        amount: 3,
      },
    ],
    steps: ["cook rice", "fry chicken", "eat"],
    urlSource:
      "https://itsallgoodvegan.com/wp-content/uploads/2020/05/IMG_4689.jpg",
    cost: {
      total: 4.67,
      perServing: 0.68,
    },
  };
  result = new recipeModel(dummyRecipe);
  await result.save();

  //   dummyRecipe = {
  //     name: "Pepe Guardiola",
  //     job: "Soccer coach",
  //   };
  //   result = new recipeModel(dummyRecipe);
  //   await result.save();
});

afterEach(async () => {
  await recipeModel.deleteMany();
});

// test("Fetching all recipes", async () => {
//   const recipes = await recipeServices.getRecipe();
//   expect(recipes).toBeDefined();
//   expect(recipes.length).toBeGreaterThan(0);
//   done()
// });

test("Fetching recipes by name", async () => {
  const recipeName = "curry";
  const recipes = await recipeServices.getRecipe(recipeName);
  expect(recipes).toBeDefined();
  expect(recipes.length).toBeGreaterThan(0);
  recipes.forEach((recipe) => expect(recipe.title).toBe(recipeName));
});

// test("Fetching recipes by job", async () => {
//   const recipeJob = "Soccer coach";
//   const recipes = await recipeServices.getRecipes(undefined, recipeJob);
//   expect(recipes).toBeDefined();
//   expect(recipes.length).toBeGreaterThan(0);
//   recipes.forEach((recipe) => expect(recipe.job).toBe(recipeJob));
// });

// // test("Fetching recipes by name and job", async () => {
// //   const recipeName = "Ted Lasso";
// //   const recipeJob = "Soccer coach";
// //   const recipes = await recipeServices.getRecipes(recipeName, recipeJob);
// //   expect(recipes).toBeDefined();
// //   expect(recipes.length).toBeGreaterThan(0);
// //   recipes.forEach(
// //     (recipe) => expect(recipe.name).toBe(recipeName) && expect(recipe.job).toBe(recipeJob)
// //   );
// // });

// test("Fetching by invalid id format", async () => {
//   const anyId = "123";
//   const recipe = await recipeServices.findRecipeById(anyId);
//   expect(recipe).toBeUndefined();
// });

// test("Fetching by valid id and not finding", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const recipe = await recipeServices.findRecipeById(anyId);
//   expect(recipe).toBeNull();
// });

// test("Fetching by valid id and finding", async () => {
//   const dummyRecipe = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = new recipeModel(dummyRecipe);
//   const addedRecipe = await result.save();
//   const foundRecipe = await recipeServices.findRecipeById(addedRecipe.id);
//   expect(foundRecipe).toBeDefined();
//   expect(foundRecipe.id).toBe(addedRecipe.id);
//   expect(foundRecipe.name).toBe(addedRecipe.name);
//   expect(foundRecipe.job).toBe(addedRecipe.job);
// });

// test("Deleting a recipe by Id -- successful path", async () => {
//   const dummyRecipe = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = new recipeModel(dummyRecipe);
//   const addedRecipe = await result.save();
//   const deleteResult = await recipeModel.findOneAndDelete({ _id: addedRecipe.id });
//   expect(deleteResult).toBeTruthy();
// });

// test("Deleting a recipe by Id -- inexisting id", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const deleteResult = await recipeModel.findOneAndDelete({ _id: anyId });
//   expect(deleteResult).toBeNull();
// });

// test("Adding recipe -- successful path", async () => {
//   const dummyRecipe = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = await recipeServices.addRecipe(dummyRecipe);
//   expect(result).toBeTruthy();
//   expect(result.name).toBe(dummyRecipe.name);
//   expect(result.job).toBe(dummyRecipe.job);
//   expect(result).toHaveProperty("_id");
// });

// test("Adding recipe -- failure path with invalid id", async () => {
//   const dummyRecipe = {
//     _id: "123",
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = await recipeServices.addRecipe(dummyRecipe);
//   expect(result).toBeFalsy();
// });

// test("Adding recipe -- failure path with already taken id", async () => {
//   const dummyRecipe = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const addedRecipe = await recipeServices.addRecipe(dummyRecipe);

//   const anotherDummyRecipe = {
//     _id: addedRecipe.id,
//     name: "Ron",
//     job: "Young wizard",
//   };
//   const result = await recipeServices.addRecipe(anotherDummyRecipe);
//   expect(result).toBeFalsy();
// });

// test("Adding recipe -- failure path with invalid job length", async () => {
//   const dummyRecipe = {
//     name: "Harry Potter",
//     job: "Y",
//   };
//   const result = await recipeServices.addRecipe(dummyRecipe);
//   expect(result).toBeFalsy();
// });

// test("Adding recipe -- failure path with no job", async () => {
//   const dummyRecipe = {
//     name: "Harry Potter",
//   };
//   const result = await recipeServices.addRecipe(dummyRecipe);
//   expect(result).toBeFalsy();
// });

// test("Adding recipe -- failure path with no name", async () => {
//   const dummyRecipe = {
//     job: "Young wizard",
//   };
//   const result = await recipeServices.addRecipe(dummyRecipe);
//   expect(result).toBeFalsy();
// });
