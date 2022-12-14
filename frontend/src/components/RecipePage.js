import axios from "axios";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
// import bookmarkImg from "../images/pngegg.png";
// import bookmarkImg2 from "../images/Project (20221116020253).png";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const [steps, setSteps] = useState([]);
  const [cost, setCost] = useState([]);
  const [time, setTime] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    fetchByID(id).then((result) => {
      if (result) {
        setRecipe(result);
        setIngredient(result.ingredients);
        setSteps(result.steps);
        setCost(result.price);
        setTime(result.totalTime);
        setUser(result.user);
        const total = result.price * result.servings;
        setTotalPrice(total);
      }
    });
  }, [id]);

  async function fetchByID(id) {
    try {
      const response = await axios.get("http://localhost:5000/recipes/" + id);
      return response.data.recipes_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  if (recipe) {
    return (
      <body>
        <div className="entire-page">
          {/* RECIPE HEADER */}
          <div className="recipe-title-bookmark">
            <h1 className="recipe-header-page main_header">{recipe.title}</h1>
          </div>
          {/* RECIPE BODY */}
          <div className="recipe-page-first">
            <img
              src={recipe.urlSource}
              alt={recipe.title}
              className="big-img"
            />
            <div className="recipe-desc-ingr">
              <div className="time-desc-wrapper">
                <div className="card-desc-page">
                  <h2 className="text--purple recipe-header-page main_header">
                    About
                  </h2>
                  <div className="about-body">
                    {recipe.blurb}
                    <br />
                    <br />
                    <p>
                      Recipe created by{" "}
                      <div className="text--purple bigger-text">@ {user}</div>
                    </p>
                    This recipe has a serving size of {recipe.servings}!
                  </div>
                  <h2 className="text--purple recipe-header-page main_header">
                    Stats
                  </h2>
                  <div className="stats">
                    <div className="time">
                      <h4>Time</h4>
                      <ul>
                        <li>Active: {time.active} minutes</li>
                        <li>Cook: {time.cook} minutes</li>
                      </ul>
                    </div>
                    <div className="cost">
                      <h4>Cost</h4>
                      <ul>
                        <li>Total: {totalPrice}</li>
                        <li>Per serving: {cost}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="ingredients">
              <h2 className="text--purple recipe-header-page main_header">
                Ingredients
              </h2>
              <ul className="ingredients-list">
                {ingredients.map((ingredient) => (
                  <li>
                    {ingredient.size} {ingredient.unit} of {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="instructions">
            <h2 className="text--purple main_header recipe-header-page">
              Instructions
            </h2>
            <ol className="instructions-list">
              {steps.map((step) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>
          {/* end of instructions div */}
        </div>
      </body>
    );
  }
};
export default RecipePage;
