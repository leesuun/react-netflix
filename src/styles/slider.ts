import { motion } from "framer-motion";
import styled from "styled-components";

export const SliderComponent = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 200px;
`;
export const SliderPage = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

export const SliderTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 7px;
`;

export const Movie = styled(motion.div)<{ bgphoto: string }>`
  height: 150px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  font-size: 66px;
  border-radius: 10px;

  cursor: pointer;
`;

export const SliderBtn = styled(motion.button)`
  position: absolute;
  font-size: 30px;
  top: 85px;
  border: none;
  background-color: inherit;
  text-align: center;
  color: white;
  z-index: 1;
  cursor: pointer;
`;

export const LeftBtn = styled(SliderBtn)`
  left: 3px;
`;
export const RightBtn = styled(SliderBtn)`
  right: 3px;
`;

export const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  opacity: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props) => props.theme.black.darker};
  h4 {
    font-size: 15px;
    text-align: center;
  }
`;
