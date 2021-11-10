import React from "react";
import PropTypes from "prop-types";

import TableRow from "./TableRow";

const Table = ({ shares }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Industry</th>
            <th>Number of years</th>
            <th>Price</th>
            <th>Dividend yield</th>
            <th>Annualized dividend</th>
            <th>3DGR</th>
            <th>5DGR</th>
            <th>10DGR</th>
            <th>Fair value</th>
            <th>FCF/Share</th>
            <th>P/E</th>
          </tr>
        </thead>
        <tbody>
          {shares.length > 0 &&
            shares.map((share) => {
              return <TableRow key={share.id} share={share} />;
            })}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  shares: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ticker: PropTypes.string,
      industry: PropTypes.string,
      numberOfYears: PropTypes.number,
      price: PropTypes.number,
      dividendYield: PropTypes.number,
      annualizedDividend: PropTypes.number,
      threeYearsDividendGrowthRate: PropTypes.number,
      fiveYearsDividendGrowthRate: PropTypes.number,
      tenYearsDividendGrowthRate: PropTypes.number,
      fairValue: PropTypes.string,
      freeCashFlowPerShare: PropTypes.number,
      priceEarningsRatio: PropTypes.number,
    })
  ),
};

export default Table;
