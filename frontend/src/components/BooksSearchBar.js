import React, { useState } from "react";

import "../styles/SearchBar.css";
import Search from "../images/search.png";

function BooksSearchBar (props) {

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={props.handleSubmit(query)}>
      <div className={"formContainer"}>
        <input
          placeholder="Search with your Goodreads username... eg: 53242860"
          onChange={handleInputChange}
          value={query}
          maxLength="25"
        />
        <img alt={"search"} src={Search}/>
      </div>
    </form>
  );
}

export default BooksSearchBar;
