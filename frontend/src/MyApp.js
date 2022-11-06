import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import RecipeCard from "./RecipeCards";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "./Form";
import Recipe from "./RecipeProp";

// import Button from "react-bootstrap/Button";
// // import Card from "react-bootstrap/Card";
// import CardGroup from "react-bootstrap/CardGroup";

// import RecipeCard from "./card.js"
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  const recipes = [
    {
      id: 1,
      title: "Mac n Cheese",
      time: "Total Time: 45",
      cost: "Cost per Serving: $2.50",
      description: "Easy to make recipe, full of carbs",
    },
    {
      id: 2,
      title: "Baked Potatoes",
      time: "Total Time: 25",
      cost: "Cost per Serving: $1.50",
      description: "Easy to make recipe, full of carbs",
    },
  ];

  return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">RecipeBuddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/inputRecipe">Add a recipe</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="inputRecipe" element={<InputRecipe />} />
      </Routes>
    </div>
  );

  function updateList(person) {
    console.log("got to lien 33 of myapp.js");
    makePostCall(person).then((result) => {
      if (result && result.status === 201) {
        console.log("hello " + result.status);
        setCharacters([...characters, result.data]);
      }
    });
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:5000/food", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // async function makeDeleteCall(id){
  //   try{
  //      let response = await axios.delete("http://localhost:5000/users/" + id);
  //      return response;
  //   } catch (error){
  //      console.log(error);
  //      return false;
  //   }
  // }

  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) setCharacters(result);
  //   });
  // }, []);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/users");
      return response.data.recipes_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  function Home() {
    return (
      <div>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>Here are some interesting recipes to check out</p>

          {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
        </main>
        <nav>{/* <Link to="/inputRecipe">About</Link> */}</nav>
        <div className="container">
          <Recipe passdata={recipes[1]} />
          <RecipeCard
            title="Mac n Cheese"
            time="Total Time: 45"
            cost="Cost per Serving: $2.50"
            description="Easy to make recipe, full of carbs"
          />
        </div>
      </div>
    );
  }
  function InputRecipe() {
    return (
      <>
        <main>
          <h2>Input Recipe</h2>
          <Form handleSubmit={updateList} />
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }
}

export default MyApp;
