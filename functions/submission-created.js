/* eslint-disable */
const { queryHasura } = require("./utils/hasura");
const { parseExcel } = require("./utils/parser");

exports.handler = async (event, context, callback) => {
  // const body = JSON.parse(event.body);
  // const excelFileURL = body.payload.human_fields.Excel;
  const data = await parseExcel();

  // Remove all shares from table before adding new ones
  await queryHasura({
    query: `
      mutation removeShares {
        delete_shares(where: {}) {
          affected_rows
        }
      }
    `,
  });

  const result = await queryHasura({
    query: `
      mutation addShares($objects: [shares_insert_input!]! ) {
        insert_shares(objects: $objects) {
          affected_rows
          returning {
            id
            name
            ticker
            industry
            numberOfYears
            price
            dividendYield
            annualizedDividend
            threeYearsDividendGrowthRate
            fiveYearsDividendGrowthRate
            tenYearsDividendGrowthRate
            fairValue
            freeCashFlowPerShare
            priceEarningsRatio
          }
        }
      }
    `,
    variables: {
      objects: data,
    },
  });

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(result),
  });
};
