import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
        // console.log(response);
    //   if (response.data.accessToken) {
      if (response.data) {
        console.log("HIHIHIHI" + response.data);
        console.log(JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        // let currentUser = localStorage.getItem("user");
        // console.log(currentUser);
      }
      console.log("response!!!!" + response.data);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
    let currentUser = localStorage.getItem("user");
    // console.log("getCurrentUser" + currentUser);
    return JSON.parse(currentUser);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;