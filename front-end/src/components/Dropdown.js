import React, { useState, useEffect } from "react";
import "./Dropdown.css"

const Dropdown = ({ fetchURL, label, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const values = data.map((point) => point[label]);
        setOptions(values);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [fetchURL, label]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange} className=""> 
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const MainComponent = () => {
  return (
    <div>
      <Dropdown
        fetchURL="http://127.0.0.1:8000/api/poi/poi/"
        label="description"
        placeholder="Δήμος"
      />
      <Dropdown
        fetchURL="http://127.0.0.1:8000/api/poi/poi/"
        label="district"
        placeholder="Περιφέρεια"
      />
    </div>
  );
};

export default MainComponent;
