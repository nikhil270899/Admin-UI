import React, { useRef } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const { sendSearchedData } = props;
  const searchInput = useRef("");
  const searchBarHandler = () => {
    sendSearchedData(searchInput.current.value);
  };
  return (
    <>
      <div className="search-container">
        <input
          className="search-input-text"
          type="text"
          placeholder="Search by name,email or role"
          ref={searchInput}
          onChange={searchBarHandler}
        />
      </div>
    </>
  );
}

export default SearchBar;
