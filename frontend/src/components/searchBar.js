import React, { useState } from "react";
import "./searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  let navigate = useNavigate();
  const handleKeyDown = (event) => {
    console.log("User pressed: ", event.key);

    // console.log(message);

    if (event.key === "Enter") {
      // 👇️ your logic here
      console.log("Enter key pressed ✅");
      console.log(`The word they searched for was ${wordEntered}`);
      if (wordEntered === "") {
        navigate("/");
      } else {
        navigate(`/search/${wordEntered}`);
      }
    }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          onKeyDown={handleKeyDown}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link
                className="dataItem"
                to={`/pages/${value._id}`}
                onClick={clearInput}
              >
                <p>{value.title} </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
