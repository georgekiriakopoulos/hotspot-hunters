import styles from "./App.module.css";
import MapsComp from "./components/Mapcomp";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  return (
    <div className={styles.c4}>
      <Header></Header>

      <Search className={styles.c2}></Search>

      <MapsComp className={styles.c2}></MapsComp>
    </div>
  );
}

export default App;
