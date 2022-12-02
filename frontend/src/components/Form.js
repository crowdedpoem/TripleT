import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AuthService from "../services/auth.service";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function Form() {
  var numIngredients = 0;
  var numSteps = 0;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    blurb: "",
    servings: "",
    urlSource: "",
    totalTime: {
      cook: "",
      active: "",
    },
    ingredients: [],
    steps: [],
    user: "",
  });

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dype2qwpo",
        uploadPreset: "recipeImages",
      },
      function (error, result) {
        if (result.event === "success") {
          setLoading(true);
          const urlSave = result.info.secure_url;
          setUrl(urlSave);
          setRecipe({ ...recipe, urlSource: urlSave });
          console.log(urlSave);
        }

        if (result.event === "close") {
          setLoading(false);
        }

        // setUrl(result.info.secure_url);
        // console.log(`This is url ${url}`);
      },
    );
  }, [recipe]);

  async function makePostCall(recipe) {
    console.log(recipe.totalTime);
    console.log(recipe);
    try {
      const response = await axios.post(
        "http://localhost:5000/recipes",
        recipe,
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // user 1 to many recipes
  // many recipes to many ingredients
  function submitForm() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.username);
    setRecipe({ ...recipe, user: currentUser.username });
    console.log(recipe);
    makePostCall(recipe);
    // setrecipe({title: '', servings: '',
    //  totalTime: '', activeTime: '', cookTime: '',ingredients: [],steps: []
    // });
  }

  function addStep() {
    // Generate a dynamic number of inputs
    numSteps++;
    // Get the element where the inputs will be added to
    var container = document.getElementById("steps");
    var but = container.lastChild;
    container.removeChild(container.lastChild);

    // Append a node with a random text
    // container.appendChild(document.createTextNode("Member " + (i+1)));
    var lab = document.createElement("label");
    lab.innerHTML = "Step " + (numSteps + 1);

    container.appendChild(lab);

    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "text";
    input.name = "step" + numSteps;
    input.id = "s" + numSteps;
    input.onchange = { handleChange };
    input.addEventListener(
      "change",
      function (e) {
        handleChange(e);
      },
      false,
    );

    container.appendChild(input);
    // Append a line break
    container.appendChild(document.createElement("br"));
    container.appendChild(but);
  }

  function addCardIng(event, butID) {
    console.log(document.getElementById(butID));
    let killThis = document.getElementById(butID);
    let parent = killThis.parentNode;
    parent.removeChild(killThis);
    numIngredients++;
    var container = document.getElementById("cards");
    //    var card = container.cloneNode(true)
    //    container.appendChild(card);

    let card = document.createElement("div");
    card.className = "card";
    card.style = "width: 22rem";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("div");
    title.innerText = "Ingredient " + (numIngredients + 1);
    title.className = "card-title h5";

    let label1 = document.createElement("label");
    label1.htmlFor = "input" + (numIngredients + 1);
    label1.innerText = "Name";

    let input = document.createElement("input");
    input.innerText = "Name";
    input.type = "text";
    input.className = "another-name";
    input.name = "ingredient" + numIngredients;
    input.value = recipe.ingredients;
    input.addEventListener(
      "change",
      function (e) {
        handleChange(e);
      },
      false,
    );

    let label2 = document.createElement("label");
    label2.htmlFor = "input" + (numIngredients + 1);
    label2.innerText = "Size";
    let row = document.createElement("row");
    let size = document.createElement("input");
    size.innerText = "Size";
    size.type = "text";
    size.name = "size" + numIngredients;
    size.addEventListener(
      "change",
      function (e) {
        handleChange(e);
      },
      false,
    );
    let select = document.createElement("select");
    select.name = "unit" + numIngredients;
    select.addEventListener(
      "change",
      function (e) {
        handleChange(e);
      },
      false,
    );

    let option = document.createElement("option");
    option.innerText = "--Select Unit--";
    select.appendChild(option);
    let imperial = [
      "tsp",
      "tbsp",
      "fl oz",
      "cup",
      "pint",
      "quart",
      "gallon",
      "oz",
      "pound",
      "ct",
    ];

    for (let type in imperial) {
      option = document.createElement("option");
      option.innerText = imperial[type];
      option.value = imperial[type];
      select.appendChild(option);
    }

    row.appendChild(label2);
    row.appendChild(size);
    row.appendChild(select);

    let button = document.createElement("Button");
    button.innerText = "Add Another";
    button.type = "button";
    button.id = "button" + numIngredients;
    button.addEventListener(
      "click",
      function (e) {
        addCardIng(e, button.id);
      },
      false,
    );
    button.class = "btn btn-primary";

    cardBody.appendChild(title);
    cardBody.appendChild(label1);
    cardBody.appendChild(input);
    cardBody.appendChild(row);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    container.appendChild(card);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    var temp;
    if (name === "title") {
      setRecipe({ ...recipe, title: value });
    } else if (name === "servings") {
      setRecipe({ ...recipe, servings: value });
    } else if (name === "blurb") {
      setRecipe({ ...recipe, blurb: value });
    } else if (name === "servings") {
      setRecipe({ ...recipe, servings: value });
    } else if (name.slice(0, 4) === "step") {
      let spot = name.toString();
      spot = spot.slice(4);
      temp = recipe["steps"];
      if (temp.length > spot) {
        temp[spot] = value;
      } else {
        temp.push(value);
      }

      setRecipe({ ...recipe, steps: temp });
    } else if (name.slice(0, 10) === "ingredient") {
      let spot = name.slice(10);
      temp = recipe["ingredients"];
      if (temp.length > spot) {
        temp[spot]["name"] = value;
      } else {
        let another = {
          name: value,
          size: "",
          unit: "",
        };
        temp.push(another);
      }

      setRecipe({ ...recipe, ingredients: temp });
    } else if (name.slice(0, 4) === "size") {
      let spot = name.slice(4);
      temp = recipe["ingredients"];
      if (temp.length > spot) {
        temp[spot]["size"] = value;
      } else {
        let another = {
          name: "",
          size: value,
          unit: "",
        };
        temp.push(another);
      }
      setRecipe({ ...recipe, ingredients: temp });
    } else if (name.slice(0, 4) === "unit") {
      let spot = name.slice(4);
      temp = recipe["ingredients"];
      if (temp.length > spot) {
        temp[spot]["unit"] = value;
      } else {
        let another = {
          name: "",
          size: "",
          unit: value,
        };
        temp.push(another);
      }
    } else if (name === "activeTime") {
      let temp = recipe;
      temp.totalTime.active = value;
      setRecipe(temp);
    } else if (name === "cookTime") {
      let temp = recipe;
      temp.totalTime.cook = value;
      setRecipe(temp);
    } else {
      console.log("could not find " + name);
    }
  }

  return (
    <form>
      {loading ? (
        <h3>Loading...</h3>
      ) : url ? (
        <>
          <img src={url} style={{ width: "300px" }} alt="upload" />
        </>
      ) : (
        <h3>Upload Image here</h3>
      )}
      <Button onClick={() => widgetRef.current.open()}>Upload an Image!</Button>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={recipe.title}
        onChange={handleChange}
      />

      <label htmlFor="blurb">Blurb</label>
      <input
        type="text"
        name="blurb"
        id="blurb"
        value={recipe.blurb}
        onChange={handleChange}
      />

      <label htmlFor="servings"># of Servings</label>
      <input
        type="text"
        name="servings"
        id="servings"
        value={recipe.servings}
        onChange={handleChange}
      />

      <label htmlFor="cookTime">Cook Time</label>
      <input
        type="text"
        name="cookTime"
        id="cookTime"
        value={recipe.cook}
        onChange={handleChange}
      />

      <label htmlFor="activeTime">Active Time</label>
      <input
        type="text"
        name="activeTime"
        id="activeTime"
        value={recipe.active}
        onChange={handleChange}
      />

      <div id="cards">
        <Card style={{ width: "22rem" }} id="cIng">
          <Card.Body>
            <Card.Title>Ingredient 1</Card.Title>
            <label htmlFor="ingredient">Name</label>
            <input
              type="text"
              name="ingredient0"
              id="ingredient0"
              onChange={handleChange}
            />

            <label>Size</label>
            <input
              type="text"
              name="size0"
              id="size0"
              onChange={handleChange}
            />

            <select name="unit0" onChange={handleChange}>
              <option>--Select Unit--</option>
              <option value="tsp">teaspoon</option>
              <option value="tbsp">tablespoon</option>
              <option value="fl oz">fl oz</option>
              <option value="cup">cup</option>
              <option value="pint">pint</option>
              <option value="quart">quart</option>
              <option value="gallon">gallon</option>
              <option value="oz">oz</option>
              <option value="lb">pounds</option>
              <option value="ct">count</option>
            </select>
            <Button
              id="firstBut"
              variant="primary"
              onClick={(e) => addCardIng(e, "firstBut")}
            >
              Add Another Ingredient
            </Button>
          </Card.Body>
        </Card>
      </div>

      <div id="steps">
        <label htmlFor="step">Step 1</label>
        <input type="text" name="step0" id="s0" onChange={handleChange} />
        <input type="button" value="Add Step" onClick={addStep} />
      </div>
      <br></br>

      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
