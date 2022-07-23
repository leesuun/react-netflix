const API_KEY = "9e885e4ff5433ef541fa62970547ea33";
const BASE_URL = "https://api.themoviedb.org/3";

interface genres {
  id: number;
  name: string;
}
interface countries {
  iso_3166_1: string;
  name: string;
}

export interface Movies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: genres[];
  runtime: number;
  production_countries: countries[];
  homepage: string;
}

export interface IGetMoviesResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page?: number;
  results: Movies[];
  total_pages?: number;
  total_results?: number;
  type: string;
}

export function getNowPlayMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularMovie() {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatingMovie() {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieDetail(movieId: string) {
  return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
