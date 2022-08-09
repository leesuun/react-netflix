import { atom } from "recoil";

export const detailLoadingAtom = atom({
  key: "detailLoading",
  default: false,
});

export const favoriteAtom = atom({
  key: "favorite",
  default: {
    movie: [] as any,
    tv: [] as any,
  },
});
