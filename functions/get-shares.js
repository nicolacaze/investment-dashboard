/* eslint-disable */
const { queryHasura } = require("./utils/hasura");

exports.handler = async () => {
  const { shares } = await queryHasura({
    query: `
      query getShares {
        shares {
          id
          name
          ticker
          industry
          numberOfYears
        }
      }
    `,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(shares),
  };
};
