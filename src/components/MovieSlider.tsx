import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { boxVariants, infoVariants, rowVariants } from "../animations/variants";
import { IGetMoviesResult } from "../api";
import {
  Movie,
  Info,
  SliderPage,
  SliderComponent,
  LeftBtn,
  RightBtn,
  SliderTitle,
} from "../styles/slider";
import { makeImagePath } from "../utils";

const offset = 6;

function Slider({ results, type }: IGetMoviesResult) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const tvMatch = useMatch(`/tv`);

  const onMovieClicked = (movieId?: number) => {
    if (tvMatch) {
      // navigate(`/tv/${movieId}`);
      return;
    }
    navigate(`/movies/${type}/${movieId}`);
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [direction, setDirection] = useState(String);

  const changeIndex = (direction: string) => {
    setDirection(direction);
    if (results) {
      if (leaving) return;
      const totalMovies = results.length - 1;
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
    <>
      <SliderComponent>
        <SliderTitle>{"- " + type + " -"}</SliderTitle>
        <AnimatePresence
          custom={direction}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <LeftBtn
            whileHover={{ scale: 1.2 }}
            key="left"
            onClick={() => changeIndex("left")}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </LeftBtn>
          <RightBtn
            whileHover={{ scale: 1.2 }}
            key="right"
            onClick={() => changeIndex("right")}
          >
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </RightBtn>

          <SliderPage
            custom={direction}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie, idx) => (
                <Movie
                  style={{
                    originX: idx === 0 ? 0 : idx === 5 ? 1 : undefined,
                  }}
                  layoutId={movie.id + type}
                  onClick={() => onMovieClicked(movie.id)}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  key={movie.id}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title || movie.name}</h4>
                  </Info>
                </Movie>
              ))}
          </SliderPage>
        </AnimatePresence>
      </SliderComponent>
    </>
  );
}

export default memo(Slider);
