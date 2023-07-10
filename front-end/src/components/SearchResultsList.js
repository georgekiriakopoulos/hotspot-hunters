import "./SearchResultsList.css";
import { SearchResult } from "./SearchResults";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={[result.description,'-', result.title,'-Περιφέρεια-', result.district]} key={id} />;
      })}
    </div>
  );
};


export default SearchResultsList;