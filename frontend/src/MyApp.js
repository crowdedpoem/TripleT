import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "./Form";
import RecipePage from "./RecipePage";
import RecipeCard from "./RecipeCard";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp() {
  const [recipes_list, setRecipe] = useState([]);
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setRecipe(result);
    });
  }, []);

   async function makePostCall(person){
      try {
         const response = await axios.post('http://localhost:5000/recipes', person);
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

   async function makeDeleteCall(id){
      try{
         let response = await axios.delete("http://localhost:5000/users/" + id);
         return response;
      } catch (error){
         console.log(error);
         return false;
      }
   }

   function updateList(recipe) { 
      
      console.log("here is person object ")
      console.log(recipe)
      

      // parse recipe to get all ingredients and add to database
      // add api here. API gives price and size of ingredient

      makePostCall(recipe).then( result => {
      if (result && result.status === 201){
         console.log("hello " + result.status)
      } 
         
      });
   }

   async function fetchAll(){
      try {
         const response = await axios.get('http://localhost:5000/users');
         return response.data.users_list;     
      }
      catch (error){
         //We're not handling errors. Just logging into the console.
         console.log(error); 
         return false;         
      }
   }

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
          <Route path="/pages/:id" element={<RecipePage />} >
          </Route>
    
            
        </Routes>
      </div>
    );
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201) {
        console.log("hello " + result.status);
        setRecipe([...recipes_list, result.data]);
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

  function populateCards() {
    const cards = recipes_list.map( (recipe, index) => {
      console.log(`index : ${index}: ${recipe.title}`)
      if (index <= 3)
        return <RecipeCard passdata={recipe} />
    } );  
    return cards;
  }

  function scrape(){
    console.log("hello there");
    test();
  }

  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) setCharacters(result);
  //   });
  // }, []);

  function Home() {
    const recipereturn = fetchByID('6360022e7d2d2db7e6e208f6')
    if(recipereturn)
      console.log(recipereturn)
    return (
      <div className="main-container">
        <main>
          <h2>Welcome to RecipeBuddy!</h2>
          <p>Here are some interesting recipes to explore!</p>
        </main>
        <div className="cardgroup-container">
          <CardGroup>
          {populateCards()}
          </CardGroup>
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
