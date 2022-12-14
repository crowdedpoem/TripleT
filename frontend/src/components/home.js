import axios from "axios";
import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import "./home.css";
function Home() {
  const [recipes_list, setRecipe] = useState([]);
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setRecipe(result);
    });
  }, []);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/recipes");
      return response.data.recipes_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  function populateCards() {
    const cards = recipes_list.map((recipe, index) => {
      console.log(`index : ${index}: ${recipe.title}`);
      return <RecipeCard passdata={recipe} />;
    });
    return cards;
  }

  return (
    <div className="main-container">
      <br />
      <h2>Explore some new recipes!</h2>
      <div className="cardgroup-container">{populateCards()}</div>
    </div>
  );
}

export default Home;
