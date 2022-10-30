import Table from './Table';
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp() {
	const [characters, setCharacters] = useState([]);

   async function makePostCall(person){
      try {
         const response = await axios.post('http://localhost:5000/food', person);
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

   function updateList(person) { 
      console.log("got to lien 33 of myapp.js")
      makePostCall(person).then( result => {
      if (result && result.status === 201){
         console.log("hello " + result.status)
         setCharacters([...characters, result.data] );
      } 
         
      });
   }

   useEffect(() => {
      fetchAll().then( result => {
         if (result)
            setCharacters(result);
       });
   }, [] );

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

   function removeOneCharacter (index) {

      makeDeleteCall(characters[index].id).then( result => {
         if (result && result.status === 204){
            const updated = characters.filter((character, i) => {
               return i !== index
            });
            setCharacters(updated);
         }
            
         });



   }

   return (
	<div className="container">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">RecipeBuddy</Navbar.Brand>
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




function Home() {
   return (
     <>
       <main>
         <h2>Welcome to the homepage!</h2>
         <p>You can do this, I believe in you.</p>

      <CardGroup>
         <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Recipe 1</Card.Title>
        <Card.Subtitle>Total Time: 45</Card.Subtitle>
        <Card.Subtitle>Cost per Serving: $2.50</Card.Subtitle>
        <Card.Text>
          Easy to make recipe, full of carbs
        </Card.Text>
        
        <Button variant="primary">See Recipe</Button>
      </Card.Body>
    </Card>


    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Recipe 2</Card.Title>
        <Card.Subtitle>Total Time: 30</Card.Subtitle>
        <Card.Subtitle>Cost per Serving: $2.50</Card.Subtitle>
        <Card.Text>
          Easy to make recipe, full of carbs
        </Card.Text>
        
        <Button variant="primary">See Recipe</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Recipe 3</Card.Title>
        <Card.Subtitle>Total Time: 60</Card.Subtitle>
        <Card.Subtitle>Cost per Serving: $2.50</Card.Subtitle>
        <Card.Text>
          Easy to make recipe, full of carbs
        </Card.Text>
        
        <Button variant="primary">See Recipe</Button>
      </Card.Body>
    </Card>

    </CardGroup>

         {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
       </main>
       <nav>
         <Link to="/inputRecipe">About</Link>
       </nav>
     </>
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

