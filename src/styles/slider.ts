import { motion } from "framer-motion";
import styled from "styled-components";

export const SliderComponent = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 200px;
`;
export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;

  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  /* border: 3px solid red; */
  /* padding: 0 30px; */
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 150px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  font-size: 66px;
  /* position: relative; */

  cursor: pointer;
  /* &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  } */
`;

export const SliderBtn = styled(motion.button)`
  position: absolute;
  font-size: 30px;
  top: 55px;
  border: none;
  background-color: inherit;
  text-align: center;
  color: white;
  z-index: 1;
  cursor: pointer;
`;

export const LeftMove = styled(SliderBtn)`
  left: 3px;
`;
export const RightMove = styled(SliderBtn)`
  right: 3px;
`;

export const Info = styled(motion.div)`
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
