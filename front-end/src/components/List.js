import React from 'react';
import styles from './List.module.css';

const MyList = () => {
    const items = ['Σημείο 1', 'Σημείο 2', 'Σημείο 3', 'Σημείο 4'];
  
    return (
      <div>
        <h1>Αποτελέσματα :</h1>
        <ul className="my-list"> {/* Add the CSS class to the <ul> element */}
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MyList;
