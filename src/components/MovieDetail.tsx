import {
  BasicInfo,
  DetaleButton,
  Wrapper,
  PlayBtn,
  FavoritBtn,
  MovieInfo,
  MovieOverview,
  Casts,
  Director,
} from "../styles/movieDetail";

function MovieDetail() {
  return (
    <Wrapper>
      <img src="" alt="" />
      <BasicInfo></BasicInfo>
      <DetaleButton>
        <PlayBtn></PlayBtn>
        <FavoritBtn></FavoritBtn>
      </DetaleButton>
      <MovieInfo>
        <MovieOverview></MovieOverview>
        <Casts></Casts>
        <Director></Director>
      </MovieInfo>
    </Wrapper>
  );
}

export default MovieDetail;
