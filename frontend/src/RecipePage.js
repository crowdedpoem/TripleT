import React from "react";
import fetchByID from "./MyApp";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
const RecipePage = () => {
    const {id} = useParams();
    return(

        <h1>Hi</h1>
        
    )
    
    
};
export default RecipePage;
