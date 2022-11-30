import React from "react";
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";
import "./RecipeCard.css";

function RecipeCardBody(props) {
  // <TableBody populateCard = {props.populateCard} />

  const recipe = props.passdata;
  return (
    <>
      <Card.Body className="body-container">
        <div className="stats">
          <Card.Subtitle>
            Time: {recipe.totalTime.active + recipe.totalTime.cook} minutes
          </Card.Subtitle>
          <Card.Subtitle>Cost Per Serving </Card.Subtitle>
        </div>
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
      <div className="complete-card">
        <Card.Title className="title-container">
          <h1>{props.passdata.title}</h1>
        </Card.Title>
        <Card className="food" style={{ backgroundImage: `url(${url})` }}>
          <RecipeCardBody passdata={props.passdata} />
          {/* <Button onClick = { () => navigate("/page", {ID : id})} variant="primary"> See Recipe </Button> */}
        </Card>
        <button
          onClick={() => navigate(`/pages/${props.passdata._id}`)}
          variant="primary"
        >
          {" "}
          See Recipe{" "}
        </button>
      </div>
    );
  }
}

export default RecipeCard;
// exports.RecipeCard = RecipeCard;

