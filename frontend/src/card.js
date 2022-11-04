import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function CardBody(props) {
  return (
    <CardGroup>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.populateCard.title}</Card.Title>
          <Card.Subtitle>{props.populateCard.time}</Card.Subtitle>
          <Card.Subtitle>{props.populateCard.cost}</Card.Subtitle>
          <Card.Text>{props.populateCard.description}</Card.Text>

          <Button variant="primary">See Recipe</Button>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

function RecipeCard(props) {
  return (
    <card>
      <CardBody CardData={props.populateCard} />
    </card>
  );
}

export default RecipeCard;
