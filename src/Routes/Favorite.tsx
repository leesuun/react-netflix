import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { favoriteAtom } from "../atom";
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const Wrapper = styled.div`
  margin-top: 200px;
  /* height: 100vh; */
`;

const ContentsType = styled.ul`
  display: grid;
  justify-content: center;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 400px);
  width: 100%;
  border: 5px solid red;
`;

const Box = styled.div`
  width: 400px;
  height: 200px;
  border: 3px solid blue;
`;

function Favorite() {
  const [data, setData] = useRecoilState(favoriteAtom);
  // console.log(data);

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (draggableId == "movie" || "tv") {
      setData((prev) => {
        if (!destination) return prev;
        const dataToAry = Object.entries(prev);
        const copy = dataToAry.splice(source.index, 1);
        dataToAry.splice(destination.index, 0, ...copy);
        const newData = Object.fromEntries(dataToAry);
        return { ...newData };
      });
    }
    if (draggableId == "tv or movie") {
    }
  };
  return (
    <>
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable direction="horizontal" droppableId="contentsType">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <ContentsType>
                  {Object.entries(data).map((v, idx) => (
                    <Draggable key={v[0]} index={idx} draggableId={v[0]}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          key={idx}
                        >
                          <Box>{v[0]}</Box>
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

// <Droppable droppableId="1">
//               {(provided, snapshot) => (
//                 <div ref={provided.innerRef}>
//                   {arr.map((v, idx) => (
//                     <Draggable index={idx} key={idx} draggableId={idx + ""}>
//                       {(provided, snapshot) => (
//                         <div>
//                           <Box
//                             ref={provided.innerRef}
//                             {...provided.dragHandleProps}
//                             {...provided.draggableProps}
//                           ></Box>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//             <Droppable droppableId="2">
//               {(provided, snapshot) => (
//                 <div ref={provided.innerRef}>
//                   {arr.map((v, idx) => (
//                     <Draggable index={idx} key={idx} draggableId={idx + ""}>
//                       {(provided, snapshot) => (
//                         <div>
//                           <Box
//                             ref={provided.innerRef}
//                             {...provided.dragHandleProps}
//                             {...provided.draggableProps}
//                           ></Box>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
