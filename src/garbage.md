```typescript
// object concat && set
const movie = data.filter(
  (movie) => String(movie.id) === movieMatch?.params.movieId
);

useEffect(() => {
  setMovies(() => {
    const allMovies = nowMovie?.results
      .concat(popularMovie?.results || [])
      .concat(topRatingMovie?.results || []);
    const movieIds = Array.from(new Set(allMovies?.map((movie) => movie.id)));
    const newMovies: Movies[] = [];

    allMovies?.forEach((movie) => {
      const overlapId = movieIds.findIndex((id) => id === movie.id);
      if (movieIds.includes(movie.id)) {
        newMovies.push(movie);
        movieIds.splice(overlapId, 1);
      }
    });

    return newMovies as any;
  });
}, [nowLoading, popularLoading, topRatingLoading]);
```
