const mongoose = require('mongoose')
const FoodSchema = require('./food')

let dbConnection;

function getDbConnection() {
    if (!dbConnection){
        dbConnection = mongoose.createConnection("mongodb://localhost:27017/food", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } 
    return dbConnection;
}

async function getFood(name, price){
    const foodModel = getDbConnection().model("Food", FoodSchema);
    let result;
    if(name === undefined && price === undefined){
        result = await foodModel.find();
    }
    else if(name && !price){
        result = await findFoodByName(name);
    }
    else if (price && !name){
        result = await findFoodByPrice(price);
    }
    return result;
}

async function findFoodById(id){
    const foodModel = getDbConnection().model("Food", FoodSchema);
    try{
        return await foodModel.findById(id);
    } catch(error){
        console.log(error);
        return undefined;
    }
}

async function addFood(food){
    // foodModel is a Model, a subclass of mongoose.Model
    const foodModel = getDbConnection().model("Food", FoodSchema);
    try{

        // you can use a model to create new documents using 'new' and
        // passing the JSON content of the document
        const foodToAdd = new foodModel(food)
        var name = food["title"]
        console.log("name is " + name)

        const savedFood = await foodToAdd.save()
        return savedFood

    } catch(error){
        console.log(error)
        return false
    }
}

async function findFoodByName(name){
    const foodModel = getDbConnection().model("Food", FoodSchema)
    return await foodModel.find({"name":name})
}

async function findFoodByPrice(price){
    const foodModel = getDbConnection().model("Food", FoodSchema)
    return await foodModel.find({'price':price})
}

exports.getFood = getFood
exports.addFood = addFood
exports.findFoodById = findFoodById
