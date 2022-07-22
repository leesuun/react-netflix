import {
  AnimatePresence,
  motion,
  useTransform,
  useScroll,
} from "framer-motion";

import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getPopularMovie, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";

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
  font-size: 30px;
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
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { data: nowMovie, isLoading: nowLoading } = useQuery<IGetMoviesResult>(
    ["movie", "nowPlaying"],
    getMovies
  );

  const { data: popularMovie, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movie", "popular"], getPopularMovie);

  const loading = nowLoading || popularLoading;

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

          {/* <PopularSlider results={popularMovie?.results as any} />
          <NowPlaySlider results={nowMovie?.results as any} /> */}
          <Slider type="popular" results={popularMovie?.results as any} />
          <Slider type="nowPlay" results={nowMovie?.results as any} />

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
                  layoutId={movieMatch.params.movieId}
                  style={{
                    top: setScrollY,
                  }}
                ></BigMovieBox>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
