const API_BASE_URL = "https://api.kroger.com";
import fetch from "node-fetch";

// Creates location request and display returned data on click

async function getLocations(zipCode, access_token) {
  // Build location URL
  // Base URL (https://api.kroger.com)
  // Version/Endpoint (/v1/locations)
  // Query String (?filter.zipCode.near=term)
  let locationUrl = `${API_BASE_URL}/v1/locations?filter.zipCode.near=${zipCode}&filter.limit=1`;
  // Location request body
  let locationResponse = await fetch(locationUrl, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `bearer ${access_token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  // Return JSON object
  return locationResponse.json();
}

// exports.getLocations = getLocations;
export default getLocations;
