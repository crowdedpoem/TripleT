import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Table from "./table"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// import Button from "react-bootstrap/Button";
// // import Card from "react-bootstrap/Card";
// import CardGroup from "react-bootstrap/CardGroup";

// import RecipeCard from "./card.js"
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp() {
  // const [characters, setCharacters] = useState([]);

  const recipes = [
    {
      title: 'Mac n Cheese',
      time: 'Total Time: 45',
      cost: 'Cost per Serving: $2.50',
      description: 'Easy to make recipe, full of carbs'
    },
    {
      title: 'Baked Potatoes',
      time: 'Total Time: 25',
      cost: 'Cost per Serving: $1.50',
      description: 'Easy to make recipe, full of carbs'
    },
  ];
  return (
    <div className="container">
      <Table characterData={recipes} />
    </div>
  );
  // <div className="container">
  // {/* <RecipeCard CardData = {populateCard}/> */}
  // <Table characterData = {characters}/>
  // </div>
  /* <div className="card-body">
    <CardGroup>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Recipe 1</Card.Title>
          <Card.Subtitle>Total Time: 45</Card.Subtitle>
          <Card.Subtitle>Cost per Serving: $2.50</Card.Subtitle>
          <Card.Text>Easy to make recipe, full of carbs</Card.Text>

          <Button variant="primary">See Recipe</Button>
        </Card.Body>
      </Card>
    </CardGroup>
  </div> */

  
  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) setCharacters(result);
  //   });
  // }, []);

  // async function fetchAll() {
  //   try {
  //     const response = await axios.get("http://localhost:5000/users");
  //     return response.data.users_list;
  //   } catch (error) {
  //     //We're not handling errors. Just logging into the console.
  //     console.log(error);
  //     return false;
  //   }
  // }

  // return (
  //   <div className="container">
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //     </Routes>
  //   </div>
  // );

  // function Home() {
  //   return (
  //     <>
  //       <h1>Hello!</h1>
  //       <div className="container">
  //       {/* <RecipeCard CardData = {populateCard}/> */}
  //       <Table characterData = {characters}/>
  //       </div>
  //       {/* <div className="card-body">
  //         <CardGroup>
  //           <Card style={{ width: "18rem" }}>
  //             <Card.Body>
  //               <Card.Title>Recipe 1</Card.Title>
  //               <Card.Subtitle>Total Time: 45</Card.Subtitle>
  //               <Card.Subtitle>Cost per Serving: $2.50</Card.Subtitle>
  //               <Card.Text>Easy to make recipe, full of carbs</Card.Text>

  //               <Button variant="primary">See Recipe</Button>
  //             </Card.Body>
  //           </Card>
  //         </CardGroup>
  //       </div> */}
  //     </>
  //   );
  // }
}



export default MyApp;
