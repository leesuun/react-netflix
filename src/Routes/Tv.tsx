import { AnimatePresence, useTransform, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getPopularTvShow, getTopRateTvShow, IGetContents } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";
import Detail from "../components/Detail";
import { memo } from "react";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
  OverLay,
  LargeBox,
} from "../styles/routes/home";

enum TvTypes {
  "Popular" = "Popular",
  "TopRating" = "TopRating",
}

function TvShow() {
  const navigate = useNavigate();
  const tvMatch = useMatch("/tv/:tvType/:tvId");

  const { data: popularTv, isLoading: popularLoading } = useQuery(
    ["Tv", "popular"],
    getPopularTvShow
  );
  const { data: topRateTv, isLoading: topRatingLoading } = useQuery(
    ["Tv", "topRating"],
    getTopRateTvShow
  );

  const loading = popularLoading || topRatingLoading;

  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 50);
  const onOverlayClick = () => navigate("/tv");

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(popularTv?.results[0].backdrop_path || "")}
          >
            <Title>{popularTv?.results[0].name}</Title>
            <Overview>{popularTv?.results[0].overview}</Overview>
          </Banner>

          <Slider type={TvTypes.Popular} results={popularTv?.results as any} />
          <Slider
            type={TvTypes.TopRating}
            results={topRateTv?.results as any}
          />

          <AnimatePresence>
            {tvMatch ? (
              <>
                <OverLay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onOverlayClick}
                />

                <LargeBox
                  layoutId={
                    (tvMatch.params.tvId || "") + (tvMatch.params.tvType || "")
                  }
                  style={{
                    top: setScrollY,
                  }}
                >
                  <Detail id={tvMatch.params.tvId || ""} />
                </LargeBox>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default memo(TvShow);
