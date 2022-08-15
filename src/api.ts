const API_KEY = "9e885e4ff5433ef541fa62970547ea33";
const BASE_URL = "https://api.themoviedb.org/3";

export interface genres {
  id: number;
  name: string;
}
interface countries {
  iso_3166_1: string;
  name: string;
}

export interface ContentsData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genres: genres[];
  runtime: number;
  production_countries: countries[];
  homepage: string;
  media_type: string;
  name: string;
  first_air_date: string;
  last_air_date: string;
}

export interface IGetContents {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page?: number;
  results: ContentsData[];
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

export function getPopularTvShow() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getTopRateTvShow() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTvDetail(tvId: string) {
  return fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getMultiSearch(keyword: string | null, page: number) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${keyword}&page=${page}`
  ).then((response) => response.json());
}
