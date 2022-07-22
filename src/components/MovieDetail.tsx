import { memo } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Movies } from "../api";
import { movieAtom } from "../atom";
import {
  BasicInfo,
  DetaleButton,
  Wrapper,
  PlayBtn,
  FavoritBtn,
  MovieInfo,
  MovieOverview,
  Casts,
  Director,
} from "../styles/movieDetail";
import { makeImagePath } from "../utils";

interface test {
  movie: string;
}

function MovieDetail() {
  const data = useRecoilValue(movieAtom);
  const movieMatch = useMatch("/movies/:movieType/:movieId");

  const movie = data.filter(
    (movie) => String(movie.id) === movieMatch?.params.movieId
  );

  return (
    <Wrapper>
      {movie.length !== 0 ? (
        <>
          <img src={makeImagePath(movie[0].backdrop_path, "w500")} alt="" />
          <BasicInfo></BasicInfo>
          <DetaleButton>
            <PlayBtn></PlayBtn>
            <FavoritBtn></FavoritBtn>
          </DetaleButton>
          <MovieInfo>
            <MovieOverview></MovieOverview>
            <Casts></Casts>
            <Director></Director>
          </MovieInfo>
        </>
      ) : null}
    </Wrapper>
  );
}

export default memo(MovieDetail);
