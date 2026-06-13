export const debounce = (callback, wait) => {
  // https://www.joshwcomeau.com/snippets/javascript/debounce/
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
