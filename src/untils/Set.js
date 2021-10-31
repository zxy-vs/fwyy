export const unique = (arr)=> {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1));
  }