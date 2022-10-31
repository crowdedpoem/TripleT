import { useState } from "react";
import "./app.css";
const tokenFunction = require('./token-service.js');
const productFunction = require('./product.js');



function App() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [message, setMessage] = useState("");
  let accessToken = "";
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let tokenBody = 'grant_type=client_credentials&scope=product.compact';
      let res = await tokenFunction.get(tokenBody);
      accessToken = res.access_token;
    //   console.log(accessToken);
      let productRes = await productFunction.getProducts(item, accessToken);
      console.log(productRes);
      let price = productRes.data[0].items[0].price.regular;
      let unit =  productRes.data[0].items[0].size;

      alert("The price of " + quantity + " " + item + "(" + unit +") is " + price * quantity);



    setItem("");
    setQuantity("");
    setZipCode("");
    setMessage("API request successfully");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          placeholder="Item"
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="text"
          value={quantity}
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          value={zipCode}
          placeholder="Zip Code"
          onChange={(e) => setZipCode(e.target.value)}
        />

        <button type="submit">Check</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;