import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { memo, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { boxVariants, infoVariants, rowVariants } from "../animations/variants";
import { IGetContents } from "../api";
import {
  Cover,
  Info,
  SliderPage,
  SliderComponent,
  LeftBtn,
  RightBtn,
  SliderTitle,
} from "../styles/components/slider";
import { makeImagePath } from "../utils";

const offset = 6;

function Slider({ results, type }: IGetContents) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const tvMatch = useMatch(`/tv`);

  const onContentClicked = (id?: number) => {
    if (tvMatch) {
      navigate(`/tv/${type}/${id}`);
      console.log("tv");
      return;
    }
    console.log("movie");
    navigate(`/movies/${type}/${id}`);
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [direction, setDirection] = useState(String);

  const changeIndex = (direction: string) => {
    setDirection(direction);
    if (results) {
      if (leaving) return;
      const total = results.length - 1;
      const maxIndex = Math.floor(total / offset) - 1;
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
              .map((contents, idx) => (
                <Cover
                  style={{
                    originX: idx === 0 ? 0 : idx === 5 ? 1 : undefined,
                  }}
                  layoutId={contents.id + type}
                  onClick={() => onContentClicked(contents.id)}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  key={contents.id}
                  bgphoto={makeImagePath(contents.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{contents.title || contents.name}</h4>
                  </Info>
                </Cover>
              ))}
          </SliderPage>
        </AnimatePresence>
      </SliderComponent>
    </>
  );
}

export default memo(Slider);
