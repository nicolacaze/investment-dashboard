/* eslint-disable */
const readXlsxFile = require("read-excel-file/node");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");

const { schema } = require("./schema");

const ALL_COMPANIES_SHEET_NUMBER = 5;
const SP500_DIVIDEND_YIELD = 1.5 * 1.27;
const MIN_YEARS_STREAK = 15;
const MIN_DIVIDEND_THRESHOLD = 9;
const EXCLUDED_INDUSTRIES = [
  "Oil, Gas and Consumable Fuels",
  "Equity Real Estate Investment Trusts (REITs)",
  "Tobacco",
];

function getColumnKeysPosition(headers) {
  return headers.reduce((columnKeysPosition, cell, index) => {
    switch (cell) {
      case "No Years":
        return {
          ...columnKeysPosition,
          dividendYearsStreak: index,
        };
      case "Div Yield":
        return {
          ...columnKeysPosition,
          dividendYield: index,
        };
      case "DGR 5Y":
        return {
          ...columnKeysPosition,
          fiveYearsDividendGrowthRate: index,
        };
      case "Industry":
        return {
          ...columnKeysPosition,
          industry: index,
        };
      default:
        return columnKeysPosition;
    }
  }, {});
}

function separateHeadersFromTable(rows) {
  // It is important to remove the first rows before applying any filters
  const HEADERS_INDEX = 2;
  return [rows[HEADERS_INDEX], rows.slice(HEADERS_INDEX)];
}

function getSharesAboveSP500Average(rows, columnKeysPosition) {
  return rows.filter((row) => {
    const dividendYield = row[columnKeysPosition.dividendYield];
    return dividendYield > SP500_DIVIDEND_YIELD;
  });
}

function getSharesWithMinimumDividendStreak(rows, columnKeysPosition) {
  return rows.filter((row) => {
    const dividendYearsStreak = row[columnKeysPosition.dividendYearsStreak];
    return dividendYearsStreak > MIN_YEARS_STREAK;
  });
}

function getSharesWithMinimumDividendGrowth(rows, columnKeysPosition) {
  return rows.filter((row) => {
    const dividendYieldThreshold =
      row[columnKeysPosition.dividendYield] +
      row[columnKeysPosition.fiveYearsDividendGrowthRate];
    return dividendYieldThreshold > MIN_DIVIDEND_THRESHOLD;
  });
}

function excludeGivenIndustries(rows, columnKeysPosition) {
  return rows.filter((row) => {
    const industry = row[columnKeysPosition.industry];
    return !EXCLUDED_INDUSTRIES.includes(industry);
  });
}

function applyFilters(rows) {
  let [headers, table] = separateHeadersFromTable(rows);

  const columnKeysPosition = getColumnKeysPosition(headers);

  table = getSharesAboveSP500Average(table, columnKeysPosition);
  table = getSharesWithMinimumDividendStreak(table, columnKeysPosition);
  table = getSharesWithMinimumDividendGrowth(table, columnKeysPosition);
  table = excludeGivenIndustries(table, columnKeysPosition);

  return [headers, ...table];
}

function addIdToRows(rows) {
  return rows.map((row) => ({
    id: uuid(),
    ...row,
  }));
}

async function parseExcel(excelFileURL) {
  let excelFile;

  try {
    const response = await fetch(excelFileURL);
    excelFile = await readXlsxFile(response.body, {
      sheet: ALL_COMPANIES_SHEET_NUMBER,
      schema,
      transformData: applyFilters,
    });
  } catch (error) {
    console.error("Error while parsing the excel file: ", error);
  }

  const dataWithIds = addIdToRows(excelFile.rows);

  return dataWithIds;
}

exports.parseExcel = parseExcel;
