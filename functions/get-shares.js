/* eslint-disable */
const shares = require("../data/shares.json");

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(shares),
  };
};
