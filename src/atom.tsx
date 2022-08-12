import { atom } from "recoil";
import { ContentsData } from "./api";

interface IFavorite {
  [key: string]: ContentsData[];
}

export const detailLoadingAtom = atom({
  key: "detailLoading",
  default: false,
});

export const favoriteAtom = atom<IFavorite>({
  key: "favorite",
  default: {
    movie: [] as ContentsData[],
    tv: [] as ContentsData[],
    // try extention code
    // any: [] as ContentsData[],
  },
});
