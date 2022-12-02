import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import RecipeCard from "./RecipeCard";
import CardGroup from "react-bootstrap/CardGroup";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        const filtered = result.filter((recipe) => recipe.user === id);
        setFilteredList(filtered);
      }
    });
  }, [id]);

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
      if (recipe.user.indexOf(id) > -1) {
        return <RecipeCard passdata={recipe} />;
      } else {
        return null;
      }
    });
    return cards;
  }
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      },
    );
  }, []);

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
      {filteredList ? (
        <div className="main-container">
          <br />
          <div className="cardgroup-container">
            <CardGroup>{populateCards()}</CardGroup>
          </div>
        </div>
      ) : (
        <h1>You haven't made any recipes yet!</h1>
      )}
    </>
  );
};

export default BoardUser;
