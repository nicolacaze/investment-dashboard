import React from "react";
import PropTypes from "prop-types";

import TableRow from "./TableRow";

const Table = ({ shares }) => {
  return (
    <table
      className="table-auto w-full text-sm"
      data-testid="shares-table-list"
    >
      <thead className="text-left">
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Industry</th>
          <th>Number of years</th>
          <th>Price</th>
          <th>Dividend yield</th>
        </tr>
      </thead>
      <tbody data-testid="shares-table-body">
        {shares.length > 0 &&
          shares.map((share) => {
            return <TableRow key={share.id} share={share} />;
          })}
      </tbody>
    </table>
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
    })
  ),
};

export default Table;
