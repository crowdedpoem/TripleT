import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../images/RecipeBuddyLogo.png";
import axios from "axios";
import SearchBar from "./searchBar";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

function NavigationBar() {
  const [recipes_list, setRecipe] = useState([]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

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

              <Link to="/Input" className="nav_link">
                Create Recipe
              </Link>
              <Link to="/about" className="nav_link">
                About
              </Link>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <Link to={`/${currentUser.username}`} className="nav-link">
                  User
                </Link>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>

                <Link to={"/login"} className="nav-link" onClick={logOut}>
                  LogOut
                </Link>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>

                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </div>
            )}
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
}

export default NavigationBar;
