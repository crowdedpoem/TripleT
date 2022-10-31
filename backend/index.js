const express = require('express');
const recipeServices = require("../models/recipe-services");
const app = express();
const cors = require('cors');
const port = 5000;


//TEMPLATE POST REQUEST
// { 
//   "title": "macaroni and cheese",
//   "servings": 3,
//   "blurb": "good food",
//   "totalTime":{
//     "active": 10,
//     "cook": 20 
//   },
//   "ingredient": 
//   [
//      {
//      "name": "macaroni",
//      "amount": 2, 
//      "substitute":"spaghetti"
//      }
//   ],
//   "step":
//   ["first boil noodle",
//   "make cheese sauce",
//   "eat"

//   ]
// }

//Check with https://jsonlint.com/
app.use(cors());
app.use(express.json());


// GET BY RECIPE NAME
app.get("/recipes/:id", async (req, res) => {
   const id = req.params["id"]; //or req.params.id
   let result = await recipeServices.findRecipeById(id);
   if (result === undefined)
     res.status(404).send("Resource not found.");
   else {
     res.send({ recipes_list: result });
   }
 });
 
 app.post('/recipes', async(req, res) => {
   //id generator 
   console.log(req.body);
   const recipeToAdd = req.body;
   const response = await recipeServices.addRecipe(recipeToAdd);
   if(response === false)
   {
    res.status(500).end()
   }
   else
    res.status(201).end();
 });
 
 app.delete("/recipes/:id", async(req, res) => {
   const id = req.params["id"];
   const check = await recipeServices.findRecipeById(id);
   if (check !== undefined && check.length != 0) {
     await recipeServices.deleteRecipeById(id);
     res.status(204).end();
   } else {
     res.status(404).end();
   }
 });
 
 
 app.get('/recipes', async(req, res) => {
   const ingredient = req.query['ingredient']; //or req.params.id
   const title = req.query['title'];
   let result;
   if (title === undefined && ingredient === undefined) {
      result = await recipeServices.getRecipe(title, ingredient);
    }
   if (title && !ingredient) {
      result = await recipeServices.findRecipeByTitle(title);
   }
   if (ingredient && !title) {
      result = await recipeServices.findRecipeByIngredient(ingredient);
    } 
    if (title !== undefined && ingredient !== undefined) {
      await recipeServices.findRecipeByTitleAndIngredient(title, ingredient);
   }
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
       result = {recipes_list: result};
       res.send(result);
   }
 });
 
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 });  
