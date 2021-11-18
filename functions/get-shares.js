const { queryHasura } = require("./utils/hasura");

exports.handler = async () => {
  const { shares } = await queryHasura({
    query: `
      query getShares {
        shares(limit: 10, order_by: {name: asc}) {
          id
          name
          ticker
          industry
          numberOfYears
          price
          dividendYield
        }
      }
    `,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(shares),
  };
};
