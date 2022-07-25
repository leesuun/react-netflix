import {
  AnimatePresence,
  motion,
  useTransform,
  useScroll,
} from "framer-motion";

import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getNowPlayMovies,
  getPopularMovie,
  getTopRatingMovie,
  IGetMoviesResult,
  Movies,
} from "../api";
import { makeImagePath } from "../utils";
import MovieSlider from "../components/MovieSlider";
import MovieDetail from "../components/MovieDetail";
import { memo, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { detailLoadingAtom } from "../atom";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;
const Overview = styled.p`
  font-size: 25px;
  width: 50%;
`;

const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovieBox = styled(motion.div)`
  position: absolute;
  width: 40vw;
  min-width: 400px;
  max-width: 400px;
  min-height: 600px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.veryDark};
`;

enum MovieTypes {
  "NowPlay" = "NowPlay",
  "TopRating" = "TopRating",
  "Popular" = "Popular",
}

function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieType/:movieId");

  const { data: nowMovie, isLoading: nowLoading } = useQuery<IGetMoviesResult>(
    ["movie", "nowPlaying"],
    getNowPlayMovies
  );
  const { data: popularMovie, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movie", "popular"], getPopularMovie);
  const { data: topRatingMovie, isLoading: topRatingLoading } =
    useQuery<IGetMoviesResult>(["movie", "topRating"], getTopRatingMovie);

  const loading = nowLoading || popularLoading || topRatingLoading;

  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 50);
  const onOverlayClick = () => navigate("/");

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowMovie?.results[0].backdrop_path || "")}
          >
            <Title>{nowMovie?.results[0].title}</Title>
            <Overview>{nowMovie?.results[0].overview}</Overview>
          </Banner>

          <MovieSlider
            type={MovieTypes.NowPlay}
            results={nowMovie?.results as any}
          />
          <MovieSlider
            type={MovieTypes.TopRating}
            results={topRatingMovie?.results as any}
          />
          <MovieSlider
            type={MovieTypes.Popular}
            results={popularMovie?.results as any}
          />

          <AnimatePresence>
            {movieMatch ? (
              <>
                <OverLay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onOverlayClick}
                />

                <BigMovieBox
                  layoutId={
                    (movieMatch.params.movieId || "") +
                    (movieMatch.params.movieType || "")
                  }
                  style={{
                    top: setScrollY,
                  }}
                >
                  <MovieDetail movieId={movieMatch.params.movieId || ""} />
                </BigMovieBox>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default memo(Home);
