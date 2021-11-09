/* eslint-disable */
const readXlsxFile = require("read-excel-file/node");
const path = require("path");
const { v4: uuid } = require("uuid");
const { queryHasura } = require("./utils/hasura");

exports.handler = async () => {
  const pathToExcel = path.dirname(__dirname) + "/data/sample.xlsx";

  const CHAMPIONS_LIST_SHEET_NUMBER = 2;

  const schema = {
    Company: {
      prop: "name",
      type: String,
    },
    Symbol: {
      prop: "ticker",
      type: String,
    },
    Industry: {
      prop: "industry",
      type: String,
    },
    "No Years": {
      prop: "numberOfYears",
      type: Number,
    },
  };

  function transformData(data) {
    // Remove first and second rows from the sheet before parsing.
    return data.slice(2);
  }

  function addIds(data) {
    return data.map((row) => {
      return {
        id: uuid(),
        ...row,
      };
    });
  }

  const { rows } = await readXlsxFile(pathToExcel, {
    sheet: CHAMPIONS_LIST_SHEET_NUMBER,
    schema,
    transformData,
  });

  const dataWithIds = addIds(rows);

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
      objects: dataWithIds,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
