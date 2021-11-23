import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ share }) => {
  return (
    <tr className="h-8 border-b border-dark-gray">
      <td className="w-2/12">{share.name}</td>
      <td className="w-2/12">{share.ticker}</td>
      <td className="w-2/12">{share.industry}</td>
      <td className="w-2/12">{share.numberOfYears}</td>
      <td className="w-2/12">{share.price}</td>
      <td className="w-2/12">{share.dividendYield}</td>
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
