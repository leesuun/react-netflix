import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
export const BasicInfo = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 15px;
`;
export const DetailButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  gap: 5px;
`;

const Btn = styled(motion.button)`
  height: 35px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  span {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-weight: bold;
    font-size: 15px;
    margin-left: 5px;
  }
`;

export const PlayBtn = styled(Btn)`
  width: 100%;
`;
export const FavoritBtn = styled(Btn)`
  background-color: rgba(255, 255, 255, 0.2);
  span {
    color: white;
  }
`;

export const MovieInfo = styled.div`
  margin-top: 10px;
`;
export const MovieOverview = styled.p``;

export const Genres = styled.ul`
  display: flex;
  gap: 9px;
  margin-top: 20px;
  justify-content: center;
`;
export const Genre = styled.li`
  font-size: 3px;
`;

export const Img = styled.img`
  height: 260px;
  border-radius: 10px;
`;
export const CancleBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  background-color: inherit;
  font-size: 30px;
  color: white;
  cursor: pointer;
`;
