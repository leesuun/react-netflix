import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGetMoviesResult } from "../api";
import {
  Box,
  Info,
  LeftMove,
  RightMove,
  Row,
  SliderComponent,
} from "../styles/slider";
import { makeImagePath } from "../utils";

const offset = 6;

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

interface IDivisionProps {
  division: string;
}

function Slider({ results, type }: IGetMoviesResult) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
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
        <h4>인기 영화</h4>
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
            {results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie, idx) => (
                <Box
                  style={{
                    originX: idx === 0 ? 0 : idx === 5 ? 1 : undefined,
                  }}
                  layoutId={movie.id + type}
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
      </SliderComponent>
    </>
  );
}

export default memo(Slider);
