export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function formatOverView(p: string) {
  return p.length > 250 ? p.slice(0, 250) + "....." : p;
}
