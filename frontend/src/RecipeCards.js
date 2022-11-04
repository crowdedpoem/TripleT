import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function Recipe({title, time, cost, description}) {
  return (
    // <TableBody populateCard = {props.populateCard} />
    <CardGroup>
      <Card style={{display: 'inline-block'}}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{time}</Card.Subtitle>
          <Card.Subtitle>{cost}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>

          <Button variant="primary">See Recipe</Button>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
export default Recipe;
