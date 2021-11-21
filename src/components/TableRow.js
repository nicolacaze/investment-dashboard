import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ share }) => {
  return (
    <tr className="h-8 border-b border-dark-gray">
      <td>{share.name}</td>
      <td>{share.ticker}</td>
      <td>{share.industry}</td>
      <td>{share.numberOfYears}</td>
      <td>{share.price}</td>
      <td>{share.dividendYield}</td>
    </tr>
  );
};

TableRow.propTypes = {
  share: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    ticker: PropTypes.string,
    industry: PropTypes.string,
    numberOfYears: PropTypes.number,
    price: PropTypes.number,
    dividendYield: PropTypes.number,
  }),
};

export default TableRow;
