import React from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function TableBody (props) {
    const body = props.characterData.map((row) => {
      return (
        <CardGroup>
        <Card style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Title>{body.title}</Card.Title>
        <Card.Subtitle>{body.time}</Card.Subtitle>
        <Card.Subtitle>{body.cost}</Card.Subtitle>
        <Card.Text>{body.description}</Card.Text>

        <Button variant="primary">See Recipe</Button>
      </Card.Body>
      </Card>
      </CardGroup>
      );
    });
  }
  
  function Table(props) {
    return (
        <TableBody populateCard = {props.populateCard} />
    );
  }
  export default Table;