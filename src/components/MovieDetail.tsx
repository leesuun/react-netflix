import {
  faCartArrowDown,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getMovieDetail, Movies } from "../api";

import {
  BasicInfo,
  DetailButton,
  Wrapper,
  PlayBtn,
  FavoritBtn,
  MovieInfo,
  MovieOverview,
  Img,
  Genres,
  CancleBtn,
} from "../styles/movieDetail";
import { formatOverView, makeImagePath } from "../utils";

interface IMovieDetailProps {
  movieId: string;
}

function MovieDetail({ movieId }: IMovieDetailProps) {
  const { data: movie, isLoading } = useQuery<Movies>(["movie", "detail"], () =>
    getMovieDetail(movieId)
  );
  const navigate = useNavigate();
  const onCancleBtnClick = () => navigate("/");

  return (
    <>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <Wrapper>
          {movie ? (
            <>
              <CancleBtn onClick={onCancleBtnClick}>
                <FontAwesomeIcon icon={faXmark} />
              </CancleBtn>
              <Img src={makeImagePath(movie?.poster_path)} alt="" />
              <BasicInfo>
                <span>{movie.release_date.slice(0, 4)}</span>
                <span>{movie.runtime + "min"}</span>
                <span>{movie.vote_average.toFixed(1) + "rate"}</span>
              </BasicInfo>
              <DetailButton>
                <a target="_blank" href={movie.homepage}>
                  <PlayBtn>
                    <FontAwesomeIcon icon={faPlay} />
                    <span>Play</span>
                  </PlayBtn>
                </a>

                <FavoritBtn>
                  <FontAwesomeIcon
                    style={{ color: "white" }}
                    icon={faCartArrowDown}
                  />
                  <span>Save</span>
                </FavoritBtn>
              </DetailButton>
              <MovieInfo>
                <MovieOverview>{formatOverView(movie.overview)}</MovieOverview>
                <Genres>
                  {movie.genres.map((genre) => (
                    <li>{genre.name.toLowerCase()}</li>
                  ))}
                </Genres>
              </MovieInfo>
            </>
          ) : null}
        </Wrapper>
      )}
    </>
  );
}

export default memo(MovieDetail);
