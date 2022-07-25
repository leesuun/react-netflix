import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  console.log(search.get("keyword"));

  return null;
}

export default Search;
