import styles from "./App.module.css";
import MapsComp from "./components/Mapcomp";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import React, { useState } from "react";
import { DropdownFilter } from "./components/DropdownFilter";

function App() {
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");


  const handleFilterChange = (value) => {
    setSelectedOption(value);
    // Perform any additional filtering logic based on the selected value
    // and update your data accordingly.
  };

  // Define your filter options as an array of objects
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className={styles.c4}>
      <Header></Header>

      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
      <div className="dropdown-filter">
        <p>Δήμος</p>
        <div className="dropdown-filter">
          <DropdownFilter
            options={options}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="dropdown-filter">
          <p>Περιφέρεια</p>
          <DropdownFilter
            options={options}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* <p>Selected filter: {selectedOption}</p> */}
        {/* Render your filtered data based on the selected filter */}
      </div>
      <div className={styles.c2}>
        <MapsComp></MapsComp>
      </div>
    </div>
  );
}

export default App;
