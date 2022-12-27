const buildQuery = (searchValues) => {
  let str = [];
  for (let key in searchValues) {
    if (searchValues.hasOwnProperty(key) && searchValues[key]) {
      str.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(searchValues[key])
      );
    }
  }

  return str.join("&");
};

export { buildQuery };
