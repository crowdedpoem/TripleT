const mongoose = require("mongoose");
const FoodSchema = require("./food");
const foodServices = require("./food-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let foodModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  foodModel = conn.model("Food", FoodSchema);

  foodServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyFood = {
    name: "Potato",
    price: "3.75",
    size: "1 bag",
  };
  let result = new foodModel(dummyFood);
  await result.save();

  dummyFood = {
    name: "Chicken Breast",
    price: "7.75",
    size: "4 lbs",
  };
  result = new foodModel(dummyFood);
  await result.save();

  dummyFood = {
    name: "Eggs",
    price: "5.34",
    size: "1 dozen",
  };
  result = new foodModel(dummyFood);
  await result.save();

  dummyFood = {
    name: "Bananas",
    price: "3.56",
    size: "1 bushel",
  };
  result = new foodModel(dummyFood);
  await result.save();
});

afterEach(async () => {
  await foodModel.deleteMany();
});

test("Fetching all food", async () => {
  const food = await foodServices.getfood();
  expect(food).toBeDefined();
  expect(food.length).toBeGreaterThan(0);
});

test("Fetching food by name", async () => {
  const name = "Potato";
  const food = await foodServices.getFood(name, undefined);
  expect(food).toBeDefined();
  expect(food.length).toBeGreaterThan(0);
  food.forEach((item) => expect(item.name).toBe(name));
});

test("Fetching food by price", async () => {
  const price = "7.75";
  const food = await foodServices.getFood(undefined, price);
  expect(food).toBeDefined();
  expect(food.length).toBeGreaterThan(0);
  food.forEach((item) => expect(item.price).toBe(price));
});

// test("Fetching by valid id and not finding", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const user = await foodervices.findUserById(anyId);
//   expect(user).toBeNull();
// });

// test("Fetching by valid id and finding", async () => {
//   const dummyFood = {
//     name: "Harry Potter",
//     price: "Young wizard",
//   };
//   const result = new foodModel(dummyFood);
//   const addedUser = await result.save();
//   const foundUser = await foodervices.findUserById(addedUser.id);
//   expect(foundUser).toBeDefined();
//   expect(foundUser.id).toBe(addedUser.id);
//   expect(foundUser.name).toBe(addedUser.name);
//   expect(foundUser.price).toBe(addedUser.price);
// });

// test("Deleting a user by Id -- successful path", async () => {
//   const dummyFood = {
//     name: "Harry Potter",
//     price: "Young wizard",
//   };
//   const result = new foodModel(dummyFood);
//   const addedUser = await result.save();
//   const deleteResult = await foodModel.findOneAndDelete({ _id: addedUser.id });
//   expect(deleteResult).toBeTruthy();
// });

// test("Deleting a user by Id -- inexisting id", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const deleteResult = await foodModel.findOneAndDelete({ _id: anyId });
//   expect(deleteResult).toBeNull();
// });

// test("Adding user -- successful path", async () => {
//   const dummyFood = {
//     name: "Harry Potter",
//     price: "Young wizard",
//   };
//   const result = await foodervices.addUser(dummyFood);
//   expect(result).toBeTruthy();
//   expect(result.name).toBe(dummyFood.name);
//   expect(result.price).toBe(dummyFood.price);
//   expect(result).toHaveProperty("_id");
// });

// test("Adding user -- failure path with invalid id", async () => {
//   const dummyFood = {
//     _id: "123",
//     name: "Harry Potter",
//     price: "Young wizard",
//   };
//   const result = await foodervices.addUser(dummyFood);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with already taken id", async () => {
//   const dummyFood = {
//     name: "Harry Potter",
//     price: "Young wizard",
//   };
//   const addedUser = await foodervices.addUser(dummyFood);

//   const anotherdummyFood = {
//     _id: addedUser.id,
//     name: "Ron",
//     price: "Young wizard",
//   };
//   const result = await foodervices.addUser(anotherdummyFood);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with invalid price length", async () => {
//   const dummyFood = {
//     name: "Harry Potter",
//     price: "Y",
//   };
//   const result = await foodervices.addUser(dummyFood);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with no price", async () => {
//   const dummyFood = {
//     name: "Harry Potter",
//   };
//   const result = await foodervices.addUser(dummyFood);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with no name", async () => {
//   const dummyFood = {
//     price: "Young wizard",
//   };
//   const result = await foodervices.addUser(dummyFood);
//   expect(result).toBeFalsy();
// });
