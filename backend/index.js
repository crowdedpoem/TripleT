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
const cors = require('cors')
const port = 5000;

const multer = require('multer')
const Storage = multer.diskStorage({
  destination:'uploads',
  filename:(req, file, cb)=>{
    cb(null, file.originalname)
  }
});
const upload = multer({
  storage:Storage
}).single('testImage')



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

app.post('/upload', (req, res)=> {
  upload(res,req, (err) => {
    if(err){
      console.log(err)
    } else{
      let recipeModel = mongoose.model("Recipe", RecipeSchema)
      const newImage = new recipeModel({
        title: req.body.name,
        image:{
          data: req.file.filename,
          contentType: 'image/png'
        }
      })
      newImage.save()
      .then(() => res.send('successfully uploadeded')).catch(err=>console.log(err)) //10:56
    }
  })
})

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

