import axios from "axios";
import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import CardGroup from "react-bootstrap/CardGroup";
import "./home.css";
import { useParams } from "react-router-dom";

function SearchResults() {
  const [filteredList, setFilteredList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setFilteredList(result);
      }
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
    const cards = filteredList.map((recipe) => {
      if (recipe.title.indexOf(id) > -1) {
        return <RecipeCard passdata={recipe} />;
      }
      if (recipe.user.indexOf(id) > -1) {
        return <RecipeCard passdata={recipe} />;
      } else {
        return null;
      }
    });
    return cards;
  }

  return (
    <div className="main-container">
      <br />
      <div className="cardgroup-container">
        <CardGroup>{populateCards()}</CardGroup>
      </div>
    </div>
  );
}

export default SearchResults;
