export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.log("catchErrors has caught an error!");
      console.error(err);
    });
  };
};

export const shortenString = (str, len) => {
  if (str.length > len) {
    return str.slice(0, len).concat("...");
  } else {
    return str;
  }
};
