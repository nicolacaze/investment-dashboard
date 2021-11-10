import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ share }) => {
  return (
    <tr>
      <td>{share.name}</td>
      <td>{share.ticker}</td>
      <td>{share.industry}</td>
      <td>{share.numberOfYears}</td>
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
  }),
};

export default TableRow;
