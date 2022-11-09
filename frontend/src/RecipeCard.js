import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./RecipeCard.css";
// function RecipeProp(props) {
//     // <TableBody populateCard = {props.populateCard} />
//     const recipedata = props.passdata.map((recipe) => {
//       return (
//         <div key={recipe.id}>

//                 <Card.Title>{recipe.title}</Card.Title>
//                 <Card.Subtitle>{recipe.time}</Card.Subtitle>
//                 <Card.Subtitle>{recipe.cost}</Card.Subtitle>
//                 <Card.Text>{recipe.description}</Card.Text>

//         </div>
//       );
//     });
//     return(
//         <CardGroup>
//         <Card style={{ display: "inline-block" }}>
//           <Card.Body>
//              {recipedata}
//              <Button variant="primary">See Recipe</Button>
//           </Card.Body>
//             </Card>
//           </CardGroup>
//     );

// }

function RecipeCardBody(props) {
  // <TableBody populateCard = {props.populateCard} />

  const recipe = props.passdata;
  return (
    <>
      <Card.Title>
        <h1>{recipe.title}</h1>
      </Card.Title>
      <Card.Body>
        <br />
        <Card.Subtitle>
          Time: {recipe.totalTime.active + recipe.totalTime.cook} minutes
        </Card.Subtitle>
        <br />
        <Card.Subtitle>Cost Per Serving </Card.Subtitle>
        <br />
        <Card.Text>Description: {recipe.blurb}</Card.Text>
      </Card.Body>
    </>
  );
}

function RecipeCard(props) {
  const navigate = useNavigate();
  if (props) {
    const url = props.passdata.urlSource;
    return (
      <Card className = "food" style={{ backgroundImage: `url(${url})` }}>
        <RecipeCardBody passdata={props.passdata} />
        {/* <Button onClick = { () => navigate("/page", {ID : id})} variant="primary"> See Recipe </Button> */}
        <Button onClick={() => navigate(`/pages/${props.passdata._id}`)} variant="primary">
          {" "}
          See Recipe{" "}
        </Button>
      </Card>

    );
  }
}

export default RecipeCard;
