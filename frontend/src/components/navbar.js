import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../images/RecipeBuddyLogo.png";
import axios from "axios";
import SearchBar from "./SearchBar";
import React, { useState, useEffect } from "react";
function NavigationBar() {
  const [recipes_list, setRecipe] = useState([]);
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setRecipe(result);
    });
  }, []);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/recipes");
      return response.data.recipes_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  return (
    <div className="root-container">
      <header className="main-container">
        <Link to="/" className="logo_container">
          <img src={logo} className="logo-img" alt="OnlyPotatoes Logo" />
        </Link>
        <nav>
          <Link
            to="/"
            className="website-name-link"
            style={{ textDecoration: "none" }}
          >
            <h1 className="website-name">RecipeBuddy</h1>
          </Link>
          <div className="links-and-search">
            <div className="link-container">
              <Link to="/" className="nav_link">
                Home
              </Link>
              <Link to="/About" className="nav_link">
                About
              </Link>
              <Link to="/Input" className="nav_link">
                Create Recipe
              </Link>
            </div>
            {/* <SearchBar placeholder="Find a recipe!" data = {recipes_list} /> */}
          </div>
        </nav>
      </header>
      <br />
      <div className="search-bar">
        <h4>Can't find what you're looking for?</h4>
        <SearchBar placeholder="Find a recipe!" data={recipes_list} />
      </div>
    </div>
  );
  // return(
  // <Navbar bg="light" expand="lg">
  // <Container>
  //   <Navbar.Brand href="/">RecipeBuddy</Navbar.Brand>
  //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //   <Navbar.Collapse id="basic-navbar-nav">
  //     <Nav className="me-auto">
  //       <Nav.Link href="/">Home</Nav.Link>
  //       <Nav.Link href="/inputRecipe">Add a recipe</Nav.Link>
  //       <SearchBar/>
  //     </Nav>
  //   </Navbar.Collapse>
  // </Container>
  // </Navbar>
  // );
}

export default NavigationBar;
