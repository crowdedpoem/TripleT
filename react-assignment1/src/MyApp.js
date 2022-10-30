import Table from './Table';
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';



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
		
	  <Table characterData={characters} removeCharacter={removeOneCharacter} />
	  
	  <Form handleSubmit={updateList} />
	</div>
  );

}

export default MyApp;

