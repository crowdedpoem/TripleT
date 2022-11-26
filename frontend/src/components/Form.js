import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Form(props) {
  var numIngredients = 0;
  var numSteps = 0;


  const [recipe, setRecipe] = useState({
    title: "",
    numServings: "",
    totalTime: "",
    activeTime: "",
    cookTime: "",
    ingredients: [],
    steps: [],
  });

  // user 1 to many recipes
  // many recipes to many ingredients

  function submitForm() {
    props.handleSubmit(recipe);
    // setrecipe({title: '', numServings: '',
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
      false
    );

    container.appendChild(input);
    // Append a line break
    container.appendChild(document.createElement("br"));
    container.appendChild(but);
  }

  function addCardIng(event, butID) {
    console.log(document.getElementById(butID))
    let killThis = document.getElementById(butID)
    let parent = killThis.parentNode
    parent.removeChild(killThis)
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
      false
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
      false
    );
    let select = document.createElement("select");
    select.name = "unit" + numIngredients;
    select.addEventListener(
      "change",
      function (e) {
        handleChange(e);
      },
      false
    );


    let option = document.createElement("option");
    option.innerText = "--Select Unit--"
    select.appendChild(option)
    let imperial = ["tsp", "tbsp", "oz", "cup", "pint", "quart", "gallon"];
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
    button.id = "button" + numIngredients
    button.addEventListener(
      "click",
      function (e) {
        addCardIng(e, button.id);
      },
      false
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
    if (name === "title") {
      setRecipe(
        //  {numServings: recipe['numServings'], title: value }
        { ...recipe, title: value }
      );
    } else if (name === "numServings") {
      setRecipe({ ...recipe, numServings: value });
    }
    else if (name.slice(0, 4) == "step") {
      let spot = name.toString();
      spot = spot.slice(4);
      var temp = recipe["steps"];
      if (temp.length > spot) {
        temp[spot] = value;
      } else {
        temp.push(value);
      }

      setRecipe(
        { ...recipe, steps: temp }
        
      );
    } 
    else if(name.slice(0,10) == "ingredient"){
      let spot = name.slice(10)
      var temp = recipe['ingredients']
      if (temp.length > spot) {
        temp[spot]['name'] = value;

      } else {
        let another = {
          name:value,
          size:"",
          unit:"",
        }
        temp.push(another);
      }

      setRecipe(
        { ...recipe, ingredients: temp }
      );
      
    }
    else if (name.slice(0,4) == "size"){
      let spot = name.slice(4)
      var temp = recipe['ingredients']
      if (temp.length > spot) {
        temp[spot]['size'] = value;

      } else {
        let another = {
          name:"",
          size: value,
          unit:"",
        }
        temp.push(another);
      }
      setRecipe(
        { ...recipe, ingredients: temp }
      );

    }

    else if (name.slice(0,4) == "unit"){
      let spot = name.slice(4)
      var temp = recipe['ingredients']
      if (temp.length > spot) {
        temp[spot]['unit'] = value;

      } else {
        let another = {
          name:"",
          size: "",
          unit:value,
        }
        temp.push(another);
      }
    } 
    
    else {
      console.log("could not find " + name);
    }
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={recipe.title}
        onChange={handleChange}
      />

      <label htmlFor="numServings"># of Servings</label>
      <input
        type="text"
        name="numServings"
        id="numServings"
        value={recipe.numServings}
        onChange={handleChange}
      />

      {/* <label htmlFor="totalTime">Total Time</label>
      <input
        type="text"
        name="totalTime"
        id="totalTime"
        value={recipe.totalTime}
        onChange={handleChange} /> */}

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
              <option value="oz">oz</option>
              <option value="cup">cup</option>
              <option value = "pint">pint</option>
              <option value="quart">quart</option>
              <option value = "gallon">gallon</option>
            </select>
            <Button id="firstBut" variant="primary" onClick={e => addCardIng(e, "firstBut")}>
              Add Another Ingredient
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* <label htmlFor="ingredient">Ingredients 1</label>
     <div id ="food">
      <input
        type="text"
        name="ingredient"
        id="ingredient"
        value={recipe.ingredients}
        onChange={handleChange} />
        <input type="button" value="Add Ingredient" onClick={addIngredient} />
      </div> */}

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