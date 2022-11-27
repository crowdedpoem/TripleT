import axios from "axios";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import bookmarkImg from "../images/pngegg.png";
import bookmarkImg2 from "../images/Project (20221116020253).png";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const [steps, setSteps] = useState([]);
  const [cost, setCost] = useState([]);
  const [time, setTime] = useState([]);
  const { id } = useParams();
  const [bookmark, setBookmark] = useState(false);
  const [img, setImg] = useState(bookmarkImg);
  const [bookmarkCount, setBookmarkCount] = useState();

  useEffect(() => {
    fetchByID(id).then((result) => {
      if (result) {
        setRecipe(result);
        setIngredient(result.ingredients);
        setSteps(result.steps);
        setCost(result.cost);
        setTime(result.totalTime);
        setBookmarkCount(result.bookmarkCount);
      }
    });
  }, []);
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

  const bookmarkBody = (count) => {
    return {
      bookmarkCount: { count },
    };
  };

  async function updateBookmark(number) {
    try {
      console.log(bookmarkBody(number));
      const response = await axios.put(
        "http://localhost:5000/recipes" + id,
        bookmarkBody(number)
      );

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  const handleClick = () => {
    setBookmark((current) => !current);
    if (bookmark === false) {
      updateBookmark(bookmarkCount + 1);
      setImg(bookmarkImg2);
    } else {
      updateBookmark(bookmarkCount - 1);
      setImg(bookmarkImg);
    }

    console.log(bookmark);
  };

  if (recipe) {
    return (
      <body>
        {/* <div className="entire-page"> */}
        {/* RECIPE HEADER */}
        <div className="recipe-title-bookmark">
          <h1 className="recipe-header-page main_header">{recipe.title}</h1>

          <div className="bookmark">
            <figure className="bookmark__img--wrapper">
              <img
                onClick={handleClick}
                src={img}
                alt="bookmark"
                className="bookmark__img"
              />
            </figure>
          </div>
        </div>
        {/* RECIPE BODY */}
        <p>Recipe created by {recipe.user}</p>
        <h2>
          ${cost.total} Total / ${cost.perServing} per serving, Serving size:{" "}
          {recipe.servings}
        </h2>
        <div className="recipe-page-first">
          <img src={recipe.urlSource} alt={recipe.title} className="big-img" />
          <div className="recipe-desc-ingr">
            <p className="card-desc-page">
              {recipe.blurb}
              <br />
              <br />
              Time
              <ul>
                <li>Active: {time.active} minutes</li>
                <li>Cook: {time.cook} minutes</li>
              </ul>
            </p>

            <div className="ingredients">
              <div className="ingredient-body">
                <h2 className="text--purple recipe-header-page main_header">
                  Ingredients
                </h2>
                <ul>
                  {ingredients.map((ingredient) => (
                    <li>
                      {ingredient.name} {ingredient.amount} units, Substitute:{" "}
                      {ingredient.substitute}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <h2 className="text--purple main_header recipe-header-page">
            Instructions
          </h2>
          <ol>
            {steps.map((step) => (
              <li>{step}</li>
            ))}
          </ol>
        </div>
        {/* </div> */}
      </body>

      // <body>
      //   <h1>{recipe.title}</h1>

      //   <img src={recipe.urlSource} alt=""/>
      //   <p>Instructions</p>

      //  <ol>
      //   {populateInstructions()}
      //  </ol>

      // </body>
    );
  }
};
export default RecipePage;
