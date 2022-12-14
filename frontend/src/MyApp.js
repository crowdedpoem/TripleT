import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar";
import RecipePage from "./components/RecipePage";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Home from "./components/home";
import Form from "./components/Form";
import About from "./components/about";

import "./MyApp.css";
import SearchResults from "./components/SearchResult";
function MyApp() {
  return (
    <div className="container-main">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="pages/:id" element={<RecipePage />} />
        <Route path="/Input" element={<Form />} />
        <Route path="/search/:id" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:id" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default MyApp;
