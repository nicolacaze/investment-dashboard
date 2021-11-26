import React, { useState } from "react";
import PropTypes from "prop-types";

import TableRow from "./TableRow";
import { useAppContext } from "../context/AppContext";
import { sortBy } from "../state/thunks";

const Table = ({ shares }) => {
  const [numberOfYearsOrder, setNumberOfYearsOrder] = useState("ASC");
  const [priceOrder, setPriceOrder] = useState("ASC");
  const [dividendYieldOrder, setDividendYieldOrder] = useState("ASC");
  const { dispatch } = useAppContext();

  const handleSortByDividenYield = () => {
    dispatch(sortBy(shares, dividendYieldOrder, "dividendYield"));
    setDividendYieldOrder((dividendYieldOrder) =>
      dividendYieldOrder === "ASC" ? "DESC" : "ASC"
    );
  };

  const handleSortByNumberOfYears = () => {
    dispatch(sortBy(shares, numberOfYearsOrder, "numberOfYears"));
    setNumberOfYearsOrder((numberOfYearsOrder) =>
      numberOfYearsOrder === "ASC" ? "DESC" : "ASC"
    );
  };

  const handleSortByPrice = () => {
    dispatch(sortBy(shares, priceOrder, "price"));
    setPriceOrder((priceOrder) => (priceOrder === "ASC" ? "DESC" : "ASC"));
  };

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
          <th className="w-2/12" onClick={handleSortByNumberOfYears}>
            Number of years
          </th>
          <th className="w-2/12" onClick={handleSortByPrice}>
            Price
          </th>
          <th className="w-2/12" onClick={handleSortByDividenYield}>
            Dividend yield
          </th>
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
