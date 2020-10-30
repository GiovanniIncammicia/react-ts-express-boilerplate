export const isEmptyObj = (obj: object) => {
  for (let _ in obj) return false;
  return true;
}