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
};

exports.schema = schema;
