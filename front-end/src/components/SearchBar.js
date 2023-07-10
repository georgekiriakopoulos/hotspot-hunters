import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://127.0.0.1:8000/api/poi/poi/search")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data.filter((point) => {
          return (
            point.title.toLowerCase().includes(value.toLowerCase()) ||
            (point.district.toLowerCase().includes(value.toLowerCase())) ||
            (point.description.toLowerCase().includes(value.toLowerCase()))
          );
        });
        console.log(results);
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Αναζήτηση..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
