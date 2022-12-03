const mongoose = require("mongoose");

const RecipeSchema = require("./recipe.js");
const recipeServices = require("./recipe-services.js");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let recipeModel;
let id;

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
  console.log(result.id);
  await result.save();
  id = await recipeServices.findRecipeByTitle("curry");
});

afterEach(async () => {
  await recipeModel.deleteMany();
});

test("Fetching all recipes", async () => {
  const recipes = await recipeServices.getRecipe();
  expect(recipes).toBeDefined();
  expect(recipes.length).toBeGreaterThan(0);
});

test("Fetching recipes by name", async () => {
  const recipeName = "curry";
  const recipes = await recipeServices.getRecipe(recipeName);
  expect(recipes).toBeDefined();
  expect(recipes.length).toBeGreaterThan(0);
  recipes.forEach((recipe) => expect(recipe.title).toBe(recipeName));
});

test("test standardize units", async () => {
  const weightUnit = "lb";
  const weightVal = 3;
  const baseWeight = recipeServices.standardize(weightVal, weightUnit);
  expect(baseWeight).toStrictEqual([48, "oz"]);
});

test("add recipe", async () => {
  jest.setTimeout(10000);
  dummyRecipe = {
    title: "cake",
    servings: 3,
    blurb: "yum",
    totalTime: {
      active: 2,
      cook: 60,
    },
    ingredients: [
      {
        name: "steak",
        size: 2,
        unit: "lb",
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
  await recipeServices.addRecipe(result);

  const recipes = await recipeServices.getRecipe("cake");
  expect(recipes).toBeDefined();
  expect(recipes.length).toBe(1);
  recipes.forEach((recipe) => expect(dummyRecipe.title).toBe(recipe.title));
});

test("add recipe missing required field", async () => {
  dummyRecipe = {
    servings: 3,
    blurb: "yum",
    totalTime: {
      active: 2,
      cook: 60,
    },
    ingredients: [
      {
        name: "otter",
        size: 2,
        unit: "cup",
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
  return await recipeServices.addRecipe(result).catch((e) =>
    expect(e).toEqual({
      error: "error",
    }),
  );
});

test("Fetching recipe by ingredient", async () => {
  const ingredient = "potato";
  const recipes = await recipeServices.getRecipe(undefined, ingredient);
  expect(recipes).toBeDefined();
  expect(recipes.length).toBeGreaterThan(0);
});

test("Fetching recipe by ingredient and title", async () => {
  const ingredient = "potato";
  const title = "waffle fries";
  const recipes = await recipeServices.getRecipe(title, ingredient);
  expect(recipes).toBeDefined();
  expect(recipes.length).toBeGreaterThan(0);
});

test("Fetching recipe by id", async () => {
  const recipe = await recipeServices.findRecipeById(id);
  expect(recipe).toBeDefined();
  expect(recipe.title).toBe("curry");
});

test("Fetching recipe by bad id", async () => {
  const badId = "iifdsf";
  const recipe = await recipeServices.findRecipeById(badId);
  expect(recipe).toBeUndefined();
});

test("get price of food", async () => {
  const name = "rosemary";
  const base = [56, "oz"];
  const price = await recipeServices.getPrice(name, base, "93401");
  expect(price).toBeDefined();
  expect(price).toBeGreaterThan(0);
});

test("convert between kroger response and user input volume -> weight", async () => {
  jest.setTimeout(10000);
  const name = "rosemary";
  const base = [56, "cup"];
  const price = await recipeServices.getPrice(name, base, "93401");
  expect(price).toBeDefined();
  expect(price).toBeGreaterThan(0);
});

test("convert between kroger response and user input weight -> volume", async () => {
  jest.setTimeout(10000);
  const name = "juice";
  const base = [56, "lb"];
  const price = await recipeServices.getPrice(name, base, "93401");

  expect(price).toBeDefined();
  expect(price).toBeGreaterThan(0);
});

test("kroger response gets bad zip code", async () => {
  jest.setTimeout(10000);
  const name = "milk";
  const base = [56, "lb"];

  return await recipeServices.getPrice(name, base, "99999").catch((e) =>
    expect(e).toEqual({
      error: "Error",
    }),
  );
});

test("delete recipe by id", async () => {
  let val = await recipeServices.deleteRecipeById(id);

  expect(val).toBeDefined();
  expect(val.title).toBe("curry");
});

test("test real db connection", async () => {
  recipeServices.setConnection(null);
  let test = await recipeServices.getDbConnection();
  expect(test).toBeDefined();
  recipeServices.setConnection(conn);
});
