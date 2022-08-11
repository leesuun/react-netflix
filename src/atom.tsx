import { atom } from "recoil";
import { ContentsData } from "./api";

export const detailLoadingAtom = atom({
  key: "detailLoading",
  default: false,
});

export const favoriteAtom = atom({
  key: "favorite",
  default: {
    movie: [] as ContentsData[],
    tv: [] as ContentsData[],
    // try extention code
    // any: [] as ContentsData[],
  },
});
