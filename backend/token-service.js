const fetch = require("node-fetch");
// Parameters imported from .env environment variables
const clientId =
  "recipebuddy-78ea0d8d713a1397c62af41d256f22472044874818385584697";
const clientSecret = "qobUrIXuiNyByGowVqP8ZHNJzL-R8PPlZWzDcX7Q";
const OAUTH2_BASE_URL = "https://api.kroger.com/v1/connect/oauth2";

async function get(body) {
  // ClientId and ClientSecret (stored in .env file)
  const encoded = clientId + ":" + clientSecret;
  // ClientId and clientSecret must be encoded
  const authorization = "Basic " + Buffer.from(encoded).toString("base64");

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

  return await tokenResponse.json();
}

exports.get = get;
