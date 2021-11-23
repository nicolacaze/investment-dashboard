const { queryHasura } = require("./utils/hasura");

exports.handler = async () => {
  const result = await queryHasura({
    query: `
      query getShares {
        champions: shares(where: {numberOfYears: {_gte: 25}, freeCashFlowPerShare: {_gte: "10"}}, limit: 3) {
          id
          name
          ticker
          industry
          numberOfYears
          price
          dividendYield
        }
        shares {
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
    body: JSON.stringify(result),
  };
};
