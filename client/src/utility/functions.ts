export const isEmptyObject = function (obj: object) {
  for (let n in obj) return false;
  return true;
};