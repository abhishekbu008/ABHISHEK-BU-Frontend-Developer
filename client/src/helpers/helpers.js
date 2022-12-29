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

const createWrapperAndAppendToBody = (id) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", id);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export { buildQuery, createWrapperAndAppendToBody };
