
import axios from "axios";
import React, { useState, useEffect } from "react";
// import fetchByID from "./MyApp";
// import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
const RecipePage = () => {
    const [recipe, setRecipe] = useState([]);
    const {id} = useParams();
  useEffect(() => {
    fetchByID(id).then((result) => {
      if (result) setRecipe(result);
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

    
    return(

        <h1>{recipe.title}</h1>
        
    )
    
    
};
export default RecipePage;
