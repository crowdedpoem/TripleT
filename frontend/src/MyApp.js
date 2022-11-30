import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar";
import RecipePage from "./components/RecipePage";
import Home from "./components/home";
import Form from "./components/Form";
import "./MyApp.css";

function MyApp() {
  

  return (
    <div className="container-main">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pages/:id" element={<RecipePage />} />
        <Route path="/Input" element={<Form />} />
        <Route path="/search/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
}

export default MyApp;
