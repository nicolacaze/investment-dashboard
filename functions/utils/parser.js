/* eslint-disable */
const readXlsxFile = require("read-excel-file/node");
const path = require("path");
const { v4: uuid } = require("uuid");

const { schema } = require("./schema");

function addIds(data) {
  return data.map((row) => ({
    id: uuid(),
    ...row,
  }));
}

function transformData(data) {
  // Remove first and second rows from the sheet before parsing.
  return data.slice(2);
}

async function parseExcel() {
  const pathToExcel = path.join(__dirname, "../../", "data/sample.xlsx");
  const CHAMPIONS_LIST_SHEET_NUMBER = 2;

  let result;
  try {
    result = await readXlsxFile(pathToExcel, {
      sheet: CHAMPIONS_LIST_SHEET_NUMBER,
      schema,
      transformData,
    });
  } catch (error) {
    console.error("Error while parsing the excel file: ", error);
  }

  const dataWithIds = addIds(result.rows);

  return dataWithIds;
}

exports.parseExcel = parseExcel;
