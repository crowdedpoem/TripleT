import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function RecipeProp(props) {
    // <TableBody populateCard = {props.populateCard} />
    const data = props.map((recipe) => {
      return (
        <div key={recipe.id}>

                <Card.Title>{recipe.title}</Card.Title>
                <Card.Subtitle>{recipe.time}</Card.Subtitle>
                <Card.Subtitle>{recipe.cost}</Card.Subtitle>
                <Card.Text>{recipe.description}</Card.Text>

        </div>
      );
    });
    return(
        <CardGroup>
        <Card style={{ display: "inline-block" }}>
          <Card.Body>
             {data}
             <Button variant="primary">See Recipe</Button>
          </Card.Body>
            </Card>
          </CardGroup>
    );

}

export default RecipeProp;
