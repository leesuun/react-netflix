import { useRecoilState } from "recoil";
import styled from "styled-components";
import { favoriteAtom } from "../atom";
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { makeImagePath } from "../utils";
import { Cover } from "../styles/components/slider";
import Item from "../components/favorite/Item";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`;

const ContentsType = styled.ul`
  display: grid;
  /* place-items: center; */
  /* justify-content: center; */

  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  width: 100%;
`;

const Contents = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  min-width: 370px;
`;

const Header = styled.header`
  margin-bottom: 15px;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 30px;
  padding: 5px;
`;

function Favorite() {
  const [data, setData] = useRecoilState(favoriteAtom);
  // console.log(data);

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    // console.log(source, destination);

    if (draggableId === "movie" || draggableId === "tv") {
      setData((prev) => {
        if (!destination) return prev;
        const dataToAry = Object.entries(prev);
        const saveSource = dataToAry.splice(source.index, 1);
        dataToAry.splice(destination.index, 0, ...saveSource);
        const newData = Object.fromEntries(dataToAry);
        return { ...newData };
      });
    }

    if (!isNaN(Number(draggableId))) {
      if (data.movie.filter((v) => v.id === Number(draggableId))[0]) {
        setData((prev) => {
          if (!destination) return prev;
          const copyPrev = [...prev.movie];
          const cut = copyPrev.splice(source.index, 1);
          copyPrev.splice(destination.index, 0, ...cut);
          const obj = {
            movie: copyPrev,
            tv: prev.tv,
          };

          return { ...obj };
        });
      }
      if (data.tv.filter((v) => v.id === Number(draggableId))[0]) {
        setData((prev) => {
          if (!destination) return prev;
          const copyPrev = [...prev.tv];
          const cut = copyPrev.splice(source.index, 1);
          copyPrev.splice(destination.index, 0, ...cut);
          const obj = {
            movie: prev.movie,
            tv: copyPrev,
          };

          return { ...obj };
        });
      }
    }
  };
  return (
    <>
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            direction="horizontal"
            type="type"
            droppableId="contentsType"
          >
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <ContentsType>
                  {Object.entries(data).map((items, idx) => (
                    <Draggable
                      key={items[0]}
                      index={idx}
                      draggableId={items[0]}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          key={idx}
                        >
                          <Contents>
                            <Header>
                              <Title>
                                {items[0].charAt(0).toUpperCase() +
                                  items[0].slice(1)}
                              </Title>
                            </Header>
                            <Droppable
                              type={items[0]}
                              direction="vertical"
                              droppableId={"contents " + items[0]}
                            >
                              {(provided, snapshot) => (
                                <div ref={provided.innerRef}>
                                  {items[1].map((item, index) => (
                                    <Item
                                      backdrop_path={item.backdrop_path}
                                      genres={item.genres}
                                      id={item.id}
                                      name={item.name}
                                      title={item.title}
                                      key={item.id}
                                      index={index}
                                    ></Item>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </Contents>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </ContentsType>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    </>
  );
}
export default Favorite;
