import React from "react";
import PropTypes from "prop-types";

import TableRow from "./TableRow";

const Table = ({ shares }) => {
  return (
    <table
      className="table-auto w-full text-sm max-w-6xl"
      data-testid="shares-table-list"
    >
      <thead className="text-left block">
        <tr className="flex">
          <th className="w-2/12">Name</th>
          <th className="w-2/12">Ticker</th>
          <th className="w-2/12">Industry</th>
          <th className="w-2/12">Number of years</th>
          <th className="w-2/12">Price</th>
          <th className="w-2/12">Dividend yield</th>
        </tr>
      </thead>
      <tbody
        className="block overflow-y-scroll h-80"
        data-testid="shares-table-body"
      >
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
