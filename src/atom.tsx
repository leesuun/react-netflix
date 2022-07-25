import { atom } from "recoil";
// import { Movies } from "./api";

// export const movieAtom = atom<Movies[]>({
//   key: "movie",
//   default: [],
// });

export const detailLoadingAtom = atom({
  key: "detailLoading",
  default: false,
});
