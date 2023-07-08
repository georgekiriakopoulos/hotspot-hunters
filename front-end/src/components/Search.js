
import React, { useState } from 'react';
import styles from './Search.module.css';

const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  return (
    <div className={styles.c1}>
      <div className={styles.c2}>Pick a point</div>
      <input
        className={styles.c3}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;