/* eslint-disable */
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
  Price: {
    prop: "price",
    type: Number,
  },
  "Div Yield": {
    prop: "dividendYield",
    type: Number,
  },
  Annualized: {
    prop: "annualizedDividend",
    type: Number,
  },
  "DGR 3Y": {
    prop: "threeYearsDividendGrowthRate",
    type: Number,
  },
  "DGR 5Y": {
    prop: "fiveYearsDividendGrowthRate",
    type: Number,
  },
  "DGR 10Y": {
    prop: "tenYearsDividendGrowthRate",
    type: Number,
  },
  "Fair Value": {
    prop: "fairValue",
    type: String,
  },
  "CF/Share": {
    prop: "freeCashFlowPerShare",
    type: Number,
  },
  "P/E": {
    prop: "priceEarningsRatio",
    type: Number,
  },
};

exports.schema = schema;
