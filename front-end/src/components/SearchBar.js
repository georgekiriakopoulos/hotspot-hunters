import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

const SearchBar = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);

    console.log(input);

    // fetchData(value);
  };

 const  handleKeyPress=(e) => {
    if (e.key === 'Enter') {
      console.log("rgvervberbve");
      console.log(props.onsavesmth);
      actionlogin(props);
    }
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={handleChange}
        onKeyUp={(e) => handleKeyPress(e)}
      />
    </div>
  );
};


export default SearchBar;

export async function actionlogin(props) {

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json"
               }
  };


  const response = await fetch(
    "http://127.0.0.1:8000/api/poi/poi/",
    requestOptions
  );
  const requestdata = await response.json();
  const token = requestdata;
  console.log("token");
  console.log(token);
  console.log("toke n");

  console.log(token[0]);
  props.onsavesmth(token);

 
}