const fetch = require('node-fetch')
// import fetch from "node-fetch";
// Parameters imported from .env environment variables
const clientId =
  "recipebuddy-78ea0d8d713a1397c62af41d256f22472044874818385584697";
const clientSecret = "qobUrIXuiNyByGowVqP8ZHNJzL-R8PPlZWzDcX7Q";
const OAUTH2_BASE_URL = "https://api.kroger.com/v1/connect/oauth2";

// const redirectUrl = process.env.REDIRECT_URL;

// require('dotenv').config();
// const clientId = process.env.CLIENT_ID;
// const cliendSecret = process.env.CLIENT_SECRET;
// const OAUTH2_BASE_URL = process.env.OAUTH2_BASE_URL;
// const API_BASE_URL = process.env.API_BASE_URL;

async function get(body) {
  // ClientId and ClientSecret (stored in .env file)
  const encoded = clientId + ":" + clientSecret;
  // ClientId and clientSecret must be encoded
  const authorization = "Basic " + Buffer.from(encoded).toString("base64"); //"cmVjaXBlYnVkZHktNzhlYTBkOGQ3MTNhMTM5N2M2MmFmNDFkMjU2ZjIyNDcyMDQ0ODc0ODE4Mzg1NTg0Njk3OnFvYlVySVh1aU55QnlHb3dWcVA4WkhOSnpMLVI4UFBsWld6RGNYN1E=" //encoded.toString('base64')
  console.log(authorization);

  // Build token URL
  // Base URL (https://api.kroger.com)
  // Version/Endpoint (/v1/token)
  const tokenUrl = OAUTH2_BASE_URL + "/token";

  // Token request
  let tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  // Handle response
  if (tokenResponse.status >= 400) {
    console.log(`tokenResponse error: ${tokenResponse.status}`);
    throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
  }
  // Return json object
  return await tokenResponse.json();
}

// export default get;
exports.get = get
