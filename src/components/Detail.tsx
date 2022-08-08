import {
  faCartArrowDown,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getMovieDetail, ContentsData } from "../api";

import {
  BasicInfo,
  DetailButton,
  Wrapper,
  PlayBtn,
  FavoritBtn,
  Info,
  Overview,
  Img,
  Genres,
  CancleBtn,
} from "../styles/components/detail";
import { formatOverView, makeImagePath } from "../utils";

interface IContentDetailProps {
  id: string;
}

function Detail({ id }: IContentDetailProps) {
  const navigate = useNavigate();
  const onCancleBtnClick = () => navigate("/");

  const { data: movie, isLoading: movieLoading } = useQuery<ContentsData>(
    ["movie", "detail"],
    () => getMovieDetail(id)
  );

  const { data: tv, isLoading: tvLoading } = useQuery<ContentsData>(
    ["tv", "detail"],
    () => getMovieDetail(id)
  );

  const loading = movieLoading || tvLoading;
  const data = movie || tv;

  return (
    <>
      {loading ? (
        <span>loadng...</span>
      ) : (
        <>
          {data ? (
            <Wrapper>
              <CancleBtn onClick={onCancleBtnClick}>
                <FontAwesomeIcon icon={faXmark} />
              </CancleBtn>
              <Img src={makeImagePath(data?.poster_path)} alt="" />
              <BasicInfo>
                <span>{data.release_date.slice(0, 4)}</span>
                <span>{data.runtime + "min"}</span>
                <span>{data.vote_average.toFixed(1) + "rate"}</span>
              </BasicInfo>
              <DetailButton>
                <a target="_blank" href={data.homepage}>
                  <PlayBtn>
                    <FontAwesomeIcon icon={faPlay} />
                    <span>Play</span>
                  </PlayBtn>
                </a>

                <FavoritBtn>
                  <FontAwesomeIcon
                    style={{ color: "white" }}
                    icon={faCartArrowDown}
                  />
                  <span>Save</span>
                </FavoritBtn>
              </DetailButton>
              <Info>
                <Overview>{formatOverView(data.overview)}</Overview>
                <Genres>
                  {data.genres.slice(0, 4).map((genre) => (
                    <li key={genre.id}>{genre.name.toLowerCase()}</li>
                  ))}
                </Genres>
              </Info>
            </Wrapper>
          ) : null}
        </>
      )}
    </>
  );
}

export default memo(Detail);
