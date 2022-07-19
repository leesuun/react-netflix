import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AnimatePresence,
  motion,
  useTransform,
  useScroll,
} from "framer-motion";
import { memo, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
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
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;

  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  /* border: 3px solid red; */
  /* padding: 0 30px; */
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 150px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  font-size: 66px;
  /* position: relative; */

  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const SliderBtn = styled(motion.button)`
  position: absolute;
  font-size: 30px;
  top: 55px;
  border: none;
  background-color: inherit;
  text-align: center;
  color: white;
  z-index: 1;
`;

const LeftMove = styled(SliderBtn)`
  left: 3px;
`;
const RightMove = styled(SliderBtn)`
  right: 3px;
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: inherit;
  padding: 10px;
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
  h4 {
    font-size: 15px;
    text-align: center;
  }
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

const rowVariants = {
  hidden: (direction: string) => ({
    x: direction === "right" ? window.innerWidth - 5 : -window.innerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: string) => ({
    x: direction === "left" ? window.innerWidth - 5 : -window.innerWidth + 5,
  }),
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;
function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movie", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 50);
  const onOverlayClick = () => navigate("/");
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const [direction, setDirection] = useState(String);

  const changeIndex = (direction: string) => {
    setDirection(direction);
    if (data) {
      if (leaving) return;
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      toggleLeaving();
      if (direction === "right") {
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        return;
      }

      if (direction === "left") {
        setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        return;
      }
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              custom={direction}
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <LeftMove
                whileHover={{ scale: 1.2 }}
                key="left"
                onClick={() => changeIndex("left")}
              >
                <FontAwesomeIcon icon={faCircleArrowLeft} />
              </LeftMove>
              <RightMove
                whileHover={{ scale: 1.2 }}
                key="right"
                onClick={() => changeIndex("right")}
              >
                <FontAwesomeIcon icon={faCircleArrowRight} />
              </RightMove>
              <Row
                custom={direction}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
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
