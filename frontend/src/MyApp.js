import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavigationBar from "./components/navbar";
import RecipePage from "./components/RecipePage";
import Home from "./components/home";
import Form from "./components/Form";
import "./MyApp.css"

function MyApp() {


    return (
      <div className="container-main">
        <NavigationBar/>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Input" element={<Form />} />
          <Route path="/pages/:id" element={<RecipePage />} >
          </Route>
        </Routes>
      </div>
    );
    }

//   function updateList(person) {
//     makePostCall(person).then((result) => {
//       if (result && result.status === 201) {
//         console.log("hello " + result.status);
//         setRecipe([...recipes_list, result.data]);
//       }
//     });
//   }

//   async function makePostCall(person) {
//     try {
//       const response = await axios.post("http://localhost:5000/food", person);
//       return response;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }

//   function populateCards() {
//     const cards = recipes_list.map( (recipe, index) => {
//       console.log(`index : ${index}: ${recipe.title}`)
//       if (index <= 3)
//         return <RecipeCard passdata={recipe} />
//     } );  
//     return cards;
//   }

//   // async function makeDeleteCall(id){
//   //   try{
//   //      let response = await axios.delete("http://localhost:5000/users/" + id);
//   //      return response;
//   //   } catch (error){
//   //      console.log(error);
//   //      return false;
//   //   }
//   // }

//   // useEffect(() => {
//   //   fetchAll().then((result) => {
//   //     if (result) setCharacters(result);
//   //   });
//   // }, []);

//   function Home() {
//     const recipereturn = fetchByID('6360022e7d2d2db7e6e208f6')
//     if(recipereturn)
//       console.log(recipereturn)
//     return (
//       <div className="main-container">
//         <main>
//           <h2>Welcome to RecipeBuddy!</h2>
//           <p>Here are some interesting recipes to explore!</p>
//         </main>
//         <div className="cardgroup-container">
//           <CardGroup>
//           {populateCards()}
//           </CardGroup>
//         </div>
//       </div>
//     );
//   }

//   function InputRecipe() {
//     return (
//       <>
//         <main>
//           <h2>Input Recipe</h2>
//           <Form handleSubmit={updateList} />
//         </main>
//         <nav>
//           <Link to="/">Home</Link>
//         </nav>
//       </>
//     );
//   }
// }

export default MyApp;
