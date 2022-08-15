import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ContentsData, genres, IGetContents } from "../../api";
import { Cover } from "../../styles/components/slider";
import { makeImagePath } from "../../utils";

const Wrapper = styled.div`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-left: 10px;
  width: 100%;
`;
const Genres = styled.ul`
  margin-top: 10px;
`;
const Genre = styled.li`
  font-size: 12px;
`;
const Name = styled.h2`
  font-size: 15px;
  text-align: center;
`;

const Info = styled.div`
  display: flex;
`;

interface ItemProps {
  id: number;
  title: string;
  genres: genres[];
  name: string;
  backdrop_path: string;
  index: number;
}

function Item({ id, title, name, genres, backdrop_path, index }: ItemProps) {
  return (
    <Draggable key={id} draggableId={id + ""} index={index}>
      {(provided, snapshot) => (
        <>
          <Wrapper
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Info>
              <Cover
                style={{ width: "300px" }}
                bgphoto={makeImagePath(backdrop_path, "w500")}
              ></Cover>
              <Content>
                <Name>
                  {"- "}
                  {name || title}
                  {" -"}
                </Name>
                <Genres>
                  {genres.map((genre) => (
                    <Genre>{"- " + genre.name}</Genre>
                  ))}
                </Genres>
              </Content>
            </Info>
          </Wrapper>
        </>
      )}
    </Draggable>
  );
}

export default Item;
