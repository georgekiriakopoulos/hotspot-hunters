import { useState } from "react";
import './DropdownFilter.css';

export function DropdownFilter({ options, onFilterChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleFilterChange}>
      <option value=""> </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}