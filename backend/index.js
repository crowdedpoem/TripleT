// import express from "express";
const express = require('express')
const {
  findRecipeById,
  deleteRecipeById,
  findRecipeByTitle,
  findRecipeByIngredient,
  findRecipeByTitleAndIngredient,
  addRecipe,
  getRecipe,
} = require( "./models/recipe-services.js");
const app = express();
// import cors from "cors";
const cors = require('cors');
const cookieSession = require("cookie-session");

const port = 5000;

//TEMPLATE POST REQUEST
// {
//   "title": "waffle fries",
//   "servings": 3,
//   "blurb": "crispy fries",
//   "totalTime":{
//     "active": 5,
//     "cook": 15
//   },
//   "ingredients":
//   [
//      {
//      "name": "potato",
//      "amount": 2,
//      "substitute":"spaghetti"
//      },
//      {
//      "name": "salt",
//      "amount": 2,
//      "substitute":"spaghetti"
//      }
//   ],
//   "steps":
//   ["first boil noodle",
//   "make cheese sauce",
//   "eat"

//   ],
//   "urlSource": "https://www.foodandwine.com/thmb/FERhwFz2hJrCkgtDZmkz_rHaCrA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-hot-dogs-in-every-state-FT-BLOG1020-6e025500cefb480ba986b163792ec790.jpg",
//   "cost":{
//       "total": 4.67,
//       "perServing": 0.68
//   },
//   "user":"User"
// }

//Check with https://jsonlint.com/
app.use(cors());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "recipebuddy-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to recipe buddy application." });
});

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect("mongodb+srv://TripleT:%21RecipeBuddy%21@recipe.m0n81de.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// GET BY RECIPE NAME
app.get("/recipes/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = await findRecipeById(id);
  if (result === undefined) res.status(404).send("Resource not found.");
  else {
    res.send({ recipes_list: result });
  }
});

app.post("/recipes", async (req, res) => {
  //id generator
  console.log(req.body);
  const recipeToAdd = req.body;
  const response = await addRecipe(recipeToAdd);
  if (response === false) {
    res.status(500).end();
  } else res.status(201).end();
});

app.delete("/recipes/:id", async (req, res) => {
  const id = req.params["id"];
  const check = await findRecipeById(id);
  if (check !== undefined && check.length != 0) {
    await deleteRecipeById(id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.put("/recipes/:id", async (req, res) => {
  const id = req.params["id"];
  console.log("called");
  const check = await recipeServices.findRecipeById(id);
  if (check !== undefined && check.length != 0) {
    const result = await recipeServices.updateRecipeByID(id, req.body);
    if (result === undefined) res.status(404).send("Resource not found.");
    else {
      res.send({ recipes_list: result });
    }
  } else {
    res.status(404).end;
  }
});

app.get("/recipes", async (req, res) => {
  const ingredient = req.query["ingredient"]; //or req.params.id
  const title = req.query["title"];
  let result;
  if (title === undefined && ingredient === undefined) {
    result = await getRecipe(title, ingredient);
  }
  if (title && !ingredient) {
    result = await findRecipeByTitle(title);
  }
  if (ingredient && !title) {
    result = await findRecipeByIngredient(ingredient);
  }
  if (title !== undefined && ingredient !== undefined) {
    await findRecipeByTitleAndIngredient(title, ingredient);
  }
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    result = { recipes_list: result };
    res.send(result);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
//   const id = req.params["id"]; //or req.params.id
//   let result = await findRecipeById(id);
//   if (result === undefined) res.status(404).send("Resource not found.");
//   else {
//     res.send({ recipes_list: result });
//   }
// });




app.post("/recipes", async (req, res) => {
  //id generator
  console.log(req.body);
  const recipeToAdd = req.body;
  const response = await addRecipe(recipeToAdd);
  if (response === false) {
    res.status(500).end();
  } else res.status(201).end();
});

app.delete("/recipes/:id", async (req, res) => {
  const id = req.params["id"];
  const check = await findRecipeById(id);
  if (check !== undefined && check.length != 0) {
    await deleteRecipeById(id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get("/recipes", async (req, res) => {
  const ingredient = req.query["ingredient"]; //or req.params.id
  const title = req.query["title"];
  let result;
  if (title === undefined && ingredient === undefined) {
    result = await getRecipe(title, ingredient);
  }
  if (title && !ingredient) {
    result = await findRecipeByTitle(title);
  }
  if (ingredient && !title) {
    result = await findRecipeByIngredient(ingredient);
  }
  if (title !== undefined && ingredient !== undefined) {
    await findRecipeByTitleAndIngredient(title, ingredient);
  }
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    result = { recipes_list: result };
    res.send(result);
  }
});

