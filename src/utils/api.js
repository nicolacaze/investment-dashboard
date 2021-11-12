const NETLIFY_FUNCIONS_PATH = "/.netlify/functions";

export const getShares = () => {
  return fetch(`${NETLIFY_FUNCIONS_PATH}/get-shares`).then((response) =>
    response.json()
  );
};
