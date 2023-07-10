import "./SearchResults.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`${result}!`) }
    >
      {result}
    </div>
  );
};

export default SearchResult;
