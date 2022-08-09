import {
  faCartArrowDown,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getMovieDetail, ContentsData, getTvDetail } from "../api";
import { favoriteAtom } from "../atom";

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
  const [contents, setContents] = useRecoilState(favoriteAtom);
  const navigate = useNavigate();
  const tvMatch = useMatch("/tv/*");
  const movieMatch = useMatch("/movies/*");
  const nowLocation =
    tvMatch?.pathnameBase.slice(1) || movieMatch?.pathnameBase.slice(1);

  const { data: movie, isLoading: movieLoading } = useQuery<ContentsData>(
    ["movie", "detail"],
    () => getMovieDetail(id),
    {
      enabled: movieMatch === null ? false : true,
    }
  );

  const { data: tv, isLoading: tvLoading } = useQuery<ContentsData>(
    ["tv", "detail"],
    () => getTvDetail(id),
    { enabled: tvMatch === null ? false : true }
  );

  // console.log(movieMatch);

  const data = tvMatch ? tv : movie;
  const loading = movieLoading || tvLoading;

  const onCancleBtnClick = () => {
    if (tvMatch) {
      navigate("/tv");
      return;
    }
    navigate("/");
  };

  const onSaveFavorit = (location?: string) => {
    setContents((prev) => {
      const copyPrev = { ...prev };
      const movie = [...copyPrev.movie];
      const tv = [...copyPrev.tv];

      switch (location) {
        case "movies": {
          const id = movie.map((v) => v.id);
          if (!id.includes(data?.id)) {
            // 중복 x
            movie.push(data);
          }
          // 중복 이벤트처리 ㄱㄱ
          break;
        }
        case "tv": {
          const id = tv.map((v) => v.id);
          if (!id.includes(data?.id)) {
            tv.push(data);
          }
          break;
        }
        default:
          break;
      }

      return { movie: [...movie], tv: [...tv] };
    });
  };
  console.log(contents);
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
                <span>
                  {data.release_date
                    ? data.release_date.slice(0, 4)
                    : data.first_air_date.slice(0, 4) +
                      "~" +
                      data.last_air_date.slice(0, 4)}
                </span>
                <span>{data.runtime ? data.runtime + "min" : null}</span>
                <span>{data.vote_average.toFixed(1) + "rate"}</span>
              </BasicInfo>
              <DetailButton>
                <a target="_blank" href={data.homepage}>
                  <PlayBtn>
                    <FontAwesomeIcon icon={faPlay} />
                    <span>Play</span>
                  </PlayBtn>
                </a>

                <FavoritBtn onClick={() => onSaveFavorit(nowLocation)}>
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
