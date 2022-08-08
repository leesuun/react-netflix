import { AnimatePresence, useTransform, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import {
  getNowPlayMovies,
  getPopularMovie,
  getTopRatingMovie,
  IGetContents,
} from "../api";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";
import Detail from "../components/Detail";
import { memo } from "react";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
  OverLay,
  LargeBox,
} from "../styles/routes/home";

enum MovieTypes {
  "NowPlay" = "NowPlay",
  "TopRating" = "TopRating",
  "Popular" = "Popular",
}

function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieType/:movieId");

  const { data: nowMovie, isLoading: nowLoading } = useQuery<IGetContents>(
    ["movie", "nowPlaying"],
    getNowPlayMovies
  );
  const { data: popularMovie, isLoading: popularLoading } =
    useQuery<IGetContents>(["movie", "popular"], getPopularMovie);
  const { data: topRatingMovie, isLoading: topRatingLoading } =
    useQuery<IGetContents>(["movie", "topRating"], getTopRatingMovie);

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

          <Slider
            type={MovieTypes.NowPlay}
            results={nowMovie?.results as any}
          />
          <Slider
            type={MovieTypes.TopRating}
            results={topRatingMovie?.results as any}
          />
          <Slider
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

                <LargeBox
                  layoutId={
                    (movieMatch.params.movieId || "") +
                    (movieMatch.params.movieType || "")
                  }
                  style={{
                    top: setScrollY,
                  }}
                >
                  <Detail id={movieMatch.params.movieId || ""} />
                </LargeBox>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default memo(Home);
