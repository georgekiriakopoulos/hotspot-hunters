import styles from "./App.module.css";
import MapsComp from "./components/Mapcomp";
import Header from "./components/Header";
import  SearchBar  from "./components/SearchBar";
import  SearchResultsList  from "./components/SearchResultsList";
import React,{useState} from "react";



function App() {
  const [results, setResults] = useState([]);

  const resultdata = (filedata) =>{
    const data = {
      ...filedata
    };
    console.log("etrhetrhethetrhetrhetrhetr");   
    console.log(data);
  };

  return (
    <div className={styles.c4}>
      <Header></Header>

      
      <div className="search-bar-container">
        <SearchBar onsavesmth={resultdata} />
       
      </div>
      <div className={styles.c2} >

      <MapsComp ></MapsComp>
      {results && results.length > 0 &&
       <SearchResultsList showdata={resultdata}
       />}
      </div>

    </div>
  );
}

export default App;
