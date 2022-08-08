import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
`;
export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;
export const Overview = styled.p`
  font-size: 25px;
  width: 50%;
`;

export const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
export const LargeBox = styled(motion.div)`
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
