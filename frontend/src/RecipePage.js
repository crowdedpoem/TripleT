import React from "react";
import fetchByID from "./MyApp";
import Button from "react-bootstrap/Button";
const RecipePage = (props) => {
 
    let id = props.ID;
    let recipe = fetchByID(id);

    return(

        <h1>{recipe.title}</h1>
        
    )
    
    
};
export default RecipePage;
