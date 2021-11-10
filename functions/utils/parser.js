/* eslint-disable */
const readXlsxFile = require("read-excel-file/node");
const fetch = require("node-fetch");
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

async function parseExcel(excelFileURL) {
  const CHAMPIONS_LIST_SHEET_NUMBER = 2;

  let excelFile;

  try {
    const response = await fetch(excelFileURL);
    excelFile = await readXlsxFile(response.body, {
      sheet: CHAMPIONS_LIST_SHEET_NUMBER,
      schema,
      transformData,
    });
  } catch (error) {
    console.error("Error while parsing the excel file: ", error);
  }

  const dataWithIds = addIds(excelFile.rows);

  return dataWithIds;
}

exports.parseExcel = parseExcel;
