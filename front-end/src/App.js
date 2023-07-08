import styles from "./App.module.css";
import MapsComp from "./components/Mapcomp";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import React,{useState} from "react";
function App() {
  const [results, setResults] = useState([]);

  return (
    <div className={styles.c4}>
      <Header></Header>

      
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
      <MapsComp className={styles.c2}></MapsComp>
    </div>
  );
}

export default App;
