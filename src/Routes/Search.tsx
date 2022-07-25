import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getMultiSearch, IGetMoviesResult, Movies } from "../api";
import MovieSlider from "../components/MovieSlider";

function Search() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const queryArr: Object[] = [];
  const movieData: Movies[] = [];
  const tvData: Movies[] = [];

  for (let i = 1; i <= 5; i++) {
    queryArr.push({
      queryKey: [`search_${i}`, `${search.get("keyword")}`],
      queryFn: () => getMultiSearch(search.get("keyword"), i),
    });
  }

  const results = useQueries([...queryArr]);

  results.map((result) => {
    if (result.data !== undefined) {
      const data = { ...(result.data as IGetMoviesResult) };
      const resultData = data.results;

      tvData.push(
        ...resultData.filter(
          (v) => v.backdrop_path && v.poster_path && v.media_type === "tv"
        )
      );

      movieData.push(
        ...resultData.filter(
          (v) => v.backdrop_path && v.poster_path && v.media_type === "movie"
        )
      );
    }
  });

  return (
    <>
      <div style={{ marginTop: 200 }}>
        <MovieSlider type="movie" results={movieData} />
        <MovieSlider type="tv" results={tvData} />
      </div>
    </>
  );
}

export default Search;
// {allDataArr.map((v) => {
//   if (v.media_type === "movie") {
//     return <div key={v.id}>{v.title}</div>;
//   }
// })}
// <hr />
// <hr />
// <hr />
// {allDataArr.map((v) => {
//   if (v.media_type === "tv") {
//     return <div key={v.id}>{v.name}</div>;
//   }
// })}
