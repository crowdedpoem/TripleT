// Parameters imported from .env environment variables
// const clientId = 'recipebuddy-78ea0d8d713a1397c62af41d256f22472044874818385584697';
// const clientSecret = 'qobUrIXuiNyByGowVqP8ZHNJzL-R8PPlZWzDcX7Q';
// const redirectUrl = process.env.REDIRECT_URL;

// Get token by authorization code (getByAuth)
// async function getByAuth(code) {
//   const body = `grant_type=authorization_code&code=${encodeURIComponent(
//     code
//   )}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
//   return await get(body);
// }

// Get access token using refresh token
// async function getByRefresh(refreshToken) {
//     const body =
//       `grant_type=refresh_token&` +
//       `refresh_token=${encodeURIComponent(refreshToken)}`;
//     return await get(body);
//   }
  
  async function get(body) {
    // ClientId and ClientSecret (stored in .env file)
    const encoded = 'cmVjaXBlYnVkZHktNzhlYTBkOGQ3MTNhMTM5N2M2MmFmNDFkMjU2ZjIyNDcyMDQ0ODc0ODE4Mzg1NTg0Njk3OnFvYlVySVh1aU55QnlHb3dWcVA4WkhOSnpMLVI4UFBsWld6RGNYN1E='
    // ClientId and clientSecret must be encoded
    const authorization = "Basic " + encoded;
    // Build token URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/token)
    const tokenUrl = 'https://api.kroger.com/v1/connect/oauth2/token';

    // Token request
    let tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            Authorization: authorization,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    });
    // Handle response
    if (tokenResponse.status >= 400) {
        console.log(`tokenResponse error: ${tokenResponse.status}`);
        throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
    }
    // Return json object
    return await tokenResponse.json();
}

exports.get = get;
