// npx nodemon backend.js
const cors = require('cors');

const express = require('express');
const { restart } = require('nodemon');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const foodServices = require('./models/food-services');

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      


app.get('/food', async (req, res) => {
    const name = req.query.name;
    const price = req.query.price

    try{
        const result = await foodServices.getFood(name, price)
        res.send({food_list: result})
    } catch(error){
        console.log(error)
        res.status(500).send("an error occured in the server")
    }
});

app.get('/food/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = await foodServices.findFoodbyId(id);
    if (result === undefined || result == null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});


app.post('/food', async (req, res) => {
    const foodToAdd = req.body;
    let savedUser = await foodServices.addFood(foodToAdd);
    if (savedUser)
        res.status(201).send(savedUser)
    else
        res.status(500).end()

});


// implement delete()