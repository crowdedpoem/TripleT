import React from "react";
import groupPic from "../images/tt.png";
import "./about.css";

const About = () => {
  return (
    <body>
    <div class="container">
      <div class="image">
        <img src={groupPic} alt="group pic"></img>
      </div>
      <div class="text">
        <h1>RecipeBuddy, cook with your buddies.</h1>
      </div>
    </div>
  </body>
  );
};

export default About;