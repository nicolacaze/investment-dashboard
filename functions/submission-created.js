/* eslint-disable */
const { queryHasura } = require("./utils/hasura");
const { parseExcel } = require("./utils/parser");

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log("BODY", body);

  const excelFileURL = body.payload.human_fields.Excel;

  console.log("EXCEL FILE URL", excelFileURL);

  const data = await parseExcel(excelFileURL);

  console.log("DATA", data);

  const result = await queryHasura({
    query: `
      mutation addShares($objects: [shares_insert_input!]! ) {
        insert_shares(objects: $objects) {
          returning {
            id
            industry
            name
            numberOfYears
            ticker
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
