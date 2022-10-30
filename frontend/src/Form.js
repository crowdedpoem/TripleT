import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Form(props) {  
   
   var numIngredients = 1;
   var numSteps = 1;
   var numCards = 1;
   
   const [recipe, setrecipe] = useState(
      {  
         title: '',
         numServings: '',
         totalTime: '',
         activeTime: '',
         cookTime: '',
         ingredients: [],
         steps: []
      }
   );

   // user 1 to many recipes 
   // many recipes to many ingredients

   function submitForm() {
    props.handleSubmit(recipe);
    setrecipe({name: '', size: ''});
  }

  function addStep(){
   // Generate a dynamic number of inputs
   numSteps ++;
   // Get the element where the inputs will be added to
   var container = document.getElementById("steps");
   var but = container.lastChild
   container.removeChild(container.lastChild);

      // Append a node with a random text
      // container.appendChild(document.createTextNode("Member " + (i+1)));
      var lab = document.createElement("label");
      lab.innerHTML = "Step " + numSteps
      
      container.appendChild(lab)
      
      // Create an <input> element, set its type and name attributes
      var input = document.createElement("input");
      input.type = "text";
      input.name = "Step" + numSteps;
      input.id = "Step" + numSteps;
      input.value = recipe.ingredients
      input.onChange = {handleChange}

      // type="text"
      //   name="ingredient"
      //   id="ingredient"
      //   value={recipe.ingredients}
      //   onChange={handleChange}


      container.appendChild(input);
      // Append a line break 
      container.appendChild(document.createElement("br"));
      container.appendChild(but)
  
  } 

  function addCardIng(){
   numCards ++;
   var container = document.getElementById("cGroup");
   //    var card = container.cloneNode(true)
   //    container.appendChild(card);

   let card = document.createElement('div');
   card.className = 'card';

   let cardBody = document.createElement('Card.Body');
   cardBody.className = 'card-body';

   let title = document.createElement('Card.Title');
   title.innerText = "generated";
   title.className = 'card-title';


   cardBody.appendChild(title);
   card.appendChild(cardBody);
   container.appendChild(card);
  }

 function addIngredient(){
   // Generate a dynamic number of inputs
   numIngredients ++;
   // Get the element where the inputs will be added to
   var container = document.getElementById("food");
   var but = container.lastChild
   container.removeChild(container.lastChild);


   
      // Append a node with a random text
      // container.appendChild(document.createTextNode("Member " + (i+1)));
      var lab = document.createElement("label");
      lab.innerHTML = "Ingredient " + numIngredients
      
      container.appendChild(lab)
      
      // Create an <input> element, set its type and name attributes
      var input = document.createElement("input");
      input.type = "text";
      input.name = "Ingredient" + numIngredients;
      input.id = "ingredient" + numIngredients;
      input.value = recipe.ingredients
      input.onChange = {handleChange}

      // type="text"
      //   name="ingredient"
      //   id="ingredient"
      //   value={recipe.ingredients}
      //   onChange={handleChange}


      container.appendChild(input);
      // Append a line break 
      container.appendChild(document.createElement("br"));
      container.appendChild(but)
  
  } 



function handleChange(event) {
    const { name, value } = event.target;
    if (name === "numServings")
       setrecipe(
          {name: recipe['numServings'], numServings: value}
       );
    if (name === "title")
         setrecipe(
            {name: recipe['title'], title: value }
         )
    if (name === "ingredient")
         setrecipe(
            {name: recipe['ingredients'], ingredients: [value]}
         )
    else
      setrecipe(
          {name: value, size: recipe['size']}
       );   
  }

   return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={recipe.title}
        onChange={handleChange} />

<label htmlFor="numServings"># of Servings</label>
      <input
        type="text"
        name="numServings"
        id="numServings"
        value={recipe.numServings}
        onChange={handleChange} />


<label htmlFor="totalTime">Total Time</label>
      <input
        type="text"
        name="totalTime"
        id="totalTime"
        value={recipe.totalTime}
        onChange={handleChange} />

<CardGroup id="cGroup">
<Card style={{ width: '18rem' }} id= "cIng">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Ingredient 1</Card.Title>
        <label htmlFor="ingredient">Name</label>
        <input
        type="text"
        name="ingredient1"
        id="ingredient1"
        value={recipe.ingredients}
        onChange={handleChange} />

<label htmlFor="ingredient">Size</label>
        <input
        type="text"
        name="size1"
        id="size1"
        value={recipe.ingredients}
        onChange={handleChange} />

<label htmlFor="ingredient">Substitute</label>
        <input
        type="text"
        name="sub1"
        id="sub1"
        value={recipe.ingredients}
        onChange={handleChange} />
        
        <Button variant="primary" onClick={addCardIng}>Add Another Ingredient</Button>
      </Card.Body>
    </Card>
    </CardGroup>

<label htmlFor="ingredient">Ingredients 1</label>
     <div id ="food">
      <input
        type="text"
        name="ingredient"
        id="ingredient"
        value={recipe.ingredients}
        onChange={handleChange} />
        <input type="button" value="Add Ingredient" onClick={addIngredient} />
      </div>

      <div id = "steps">
      <label htmlFor="step">Step 1</label>
      <input
        type="text"
        name="step"
        id="step"
        value={recipe.job}
        onChange={handleChange} />
        <input type="button" value="Add Step" onClick={addStep} />
        </div>
        
        <br></br>
        
        <input type="button" value="Submit" onClick={submitForm} />
    </form>
); 
}



export default Form;