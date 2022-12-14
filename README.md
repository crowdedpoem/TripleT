![Continuous Integration](https://github.com/crowdedpoem/TripleT/actions/workflows/node.js.yml/badge.svg)

![Azure Deployment Status](https://github.com/crowdedpoem/TripleT/actions/workflows/main_recipebuddy.yml/badge.svg)

# TripleT

**RecipeBuddy - CSC307 Group Software Project**

We wanted to build an app that helps people save and share recipes with eachother. Additionally, when people cook at home they don't know the price of the meal. These are all the issues RecipeBuddy solves. RecipeBuddy is a digital recipe book where everyone can connect and view eachother's recipes. Futher, whenever someone inputs a recipe, the app will calculate the cost for the defined amount of each ingredient (given the cost per weight or cost per volume sold by Kroger Groceries). With this, the user can see the total cost of the meal and price per serving of their recipe. It is great for people who want to budget and be inspired to cook at home rather than eat out!

[Demo video](https://youtu.be/S8AHDqvkqOE)

[UML diagram](https://miro.com/welcomeonboard/ckRZN2VaUGo1R3pXTlBvOERTNkpoSmVNM0dwRkZkQnA2UXpUZmRWZ0pkRTlhZktzMHdXTDNQeEc1bkNBcEo4YnwzNDU4NzY0NTM3MDI1NDI2NzA1fDI=?share_link_id=288963627115)

[Azure deployment](https://recipebuddy.azurewebsites.net/recipes)

[UI prototype](https://www.figma.com/file/nt4PjEe9kM2o5M5rqGjrHr/RecipeBuddy?node-id=2%3A878)

[Sequence Diagram for the sign up process](https://user-images.githubusercontent.com/63368928/205413257-05a28c36-e2f0-42c8-ad34-82e8c4ac6a28.png)

code coverage report (with date and time)
![image](https://user-images.githubusercontent.com/32045248/205421162-cfdeb4ba-a63a-41ce-b843-a632f8de232e.png)


## Setup Project Environment

For app to work properly set up in the following order: MongoDB Cloud -> Backend -> Frontend

### Setup Mongo DB

- [Intall on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/Links)
- install MongoDB Compass
- Open MongoDB Compass and connect using DB URL in your `.env` file

### Setup Backend

- move terminal to `TripleT/backend` and run `$ npm install`
- to run backend, navigate to backend folder and run `$ npx nodemon index.js`
- to test backend using jest, run `$ npm test`

### Setup Frontend

- move terminal to `TripleT/frontend` and run `$ npm install`
- to run frontend locally, navigate to frontend folder, then src and run `$ npm start`

## Style Check/Linter

  RecipeBuddy uses the Mozilla Firefox style guide found [here](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript) 

- **Editor integration**
  
  Editor integration can be found [here](https://prettier.io/docs/en/editors.html)

- **Command-line**

  If you prefer to use command-line interface, navigate to your root directory and input
  <code> npm install -g prettier</code>
  Once packages have been added, you may run prettier locally using
  <code> prettier /filename</code> to run prettier on a specific file or
  <code> prettier --write .</code> to run prettier on all files at root

> If you recive the error message on Windows 8.0+
><code>Management_Install.ps1 cannot be loaded because the execution of scripts is disabled on this system. </code>

  - As an Administrator, you can set the execution policy by typing this into your PowerShell window:

    <code>Set-ExecutionPolicy RemoteSigned </code>

  >For more information, see Using the [Set-ExecutionPolicy Cmdlet](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-  executionpolicy?view=powershell-7.3).

  - When you are done, you can set the policy back to its default value with:

    <code>Set-ExecutionPolicy Restricted</code>
 
## Relational Diagram
Relational diagram for user signup process:
<img width="780" alt="user signup process" src="https://user-images.githubusercontent.com/63368928/205413257-05a28c36-e2f0-42c8-ad34-82e8c4ac6a28.png">

## License

  [MIT License](https://choosealicense.com/licenses/mit/)
