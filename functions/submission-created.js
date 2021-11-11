/* eslint-disable */
const { queryHasura } = require("./utils/hasura");
const { parseExcel } = require("./utils/parser");

exports.handler = async (event, context) => {
  // const body = JSON.parse(event.body);
  // const excelFileURL = body.payload.human_fields.Excel;
  const data = await parseExcel();

  // const result = await queryHasura({
  //   query: `
  //     mutation addShares($objects: [shares_insert_input!]! ) {
  //       insert_shares(objects: $objects) {
  //         returning {
  //           id
  //           industry
  //           name
  //           numberOfYears
  //           ticker
  //         }
  //       }
  //     }
  //   `,
  //   variables: {
  //     objects: data,
  //   },
  // });

  return {
    statusCode: 200,
    body: "wip", // JSON.stringify(result),
  };
};
