const API_BASE_URL = "https://api.kroger.com";

// Product request
async function getProducts(term, accessToken, locationId) {
  // ralphs slo locationid
  // let locationId = 70300656;

  // Use locationId as filter (if) selected by user
  let searchByLocation = "";
  if (locationId) {
    searchByLocation = `filter.locationId=${locationId}&`;
  }
  // Building product URL
  // let apiBaseUrl = 'https://api.kroger.com';
  // Version/Endpoint (/v1/products)
  // Query String (?filter.locationId=${locationId}&filter.term=${term})
  let productsUrl = `${API_BASE_URL}/v1/products?${searchByLocation}filter.term=${term}&filter.limit=1`;

  // Product request body
  let productsResponse = await fetch(productsUrl, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `bearer ${accessToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  // Return json object
  return productsResponse.json();
}

exports.getProducts = getProducts;
