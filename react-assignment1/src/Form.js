import React, {useState} from 'react';

function Form(props) {   
   const [recipe, setrecipe] = useState(
      {  
         title: '',
         numServings: '',
         totalTime: '',
         activeTime: '',
         cookTime: '',
         ingredients: [String],
         steps: []
      }
   );

   // user 1 to many recipes 
   // many recipes to many ingredients

   function submitForm() {
    props.handleSubmit(recipe);
    setrecipe({name: '', size: ''});
  }

//  function addIngredient(){
//    // Generate a dynamic number of inputs
//    var number = 1
//    // Get the element where the inputs will be added to
//    var container = document.getElementById("food");
//    var but = container.lastChild
//    container.removeChild(container.lastChild);


//    let i = 0
//       // Append a node with a random text
//       container.appendChild(document.createTextNode("Member " + (i+1)));
//       // Create an <input> element, set its type and name attributes
//       var input = document.createElement("input");
//       input.type = "text";
//       input.name = "member" + i;
//       input.id = "ingredient"
//       input.value = recipe.ingredients
//       input.onChange = {handleChange}

//       // type="text"
//       //   name="ingredient"
//       //   id="ingredient"
//       //   value={recipe.ingredients}
//       //   onChange={handleChange}


//       container.appendChild(input);
//       // Append a line break 
//       container.appendChild(document.createElement("br"));
//       container.appendChild(but)
  
//   } 



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

<label htmlFor="ingredient">Ingredients</label>
     <div id ="food">
      <input
        type="text"
        name="ingredient"
        id="ingredient"
        value={recipe.ingredients}
        onChange={handleChange} />
        {/* <input type="button" value="addIngredient" onClick={addIngredient} /> */}
      </div>





      <label htmlFor="size">Size</label>
      <input
        type="text"
        name="size"
        id="size"
        value={recipe.job}
        onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
    </form>
); 
}



export default Form;