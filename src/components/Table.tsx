import React, { useState } from "react";

import TableRow from "./TableRow";
import { useAppContext } from "../context/AppContext";
import { sortBy } from "../hooks/thunks";
import chevron from "../static/noun_chevron_2472853.svg";

type TableProps = {
  shares: Share[];
};

type Order = "ASC" | "DESC";

const Table = ({ shares }: TableProps) => {
  const [numberOfYearsOrder, setNumberOfYearsOrder] = useState("ASC");
  const [priceOrder, setPriceOrder] = useState("ASC");
  const [dividendYieldOrder, setDividendYieldOrder] = useState<Order>("ASC");
  const { dispatch } = useAppContext();

  const handleSortByDividenYield = () => {
    dispatch(sortBy(shares, dividendYieldOrder, "dividendYield"));
    setDividendYieldOrder((dividendYieldOrder) =>
      dividendYieldOrder === "ASC" ? "DESC" : "ASC"
    );
  };

  const handleSortByNumberOfYears = () => {
    // dispatch(sortBy(shares, numberOfYearsOrder, "numberOfYears"));
    setNumberOfYearsOrder((numberOfYearsOrder) =>
      numberOfYearsOrder === "ASC" ? "DESC" : "ASC"
    );
  };

  const handleSortByPrice = () => {
    // dispatch(sortBy(shares, priceOrder, "price"));
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
          <th
            className="flex items-center w-2/12 cursor-pointer"
            onClick={handleSortByNumberOfYears}
          >
            <span>Number of years</span>
            <img
              className={`w-4 ml-1${
                numberOfYearsOrder === "ASC" ? " transform rotate-180" : ""
              }`}
              src={chevron}
              alt="chevron"
            />
          </th>
          <th
            className="flex items-center w-2/12 cursor-pointer"
            onClick={handleSortByPrice}
          >
            <span>Price</span>
            <img
              className={`w-4 ml-1${
                priceOrder === "ASC" ? " transform rotate-180" : ""
              }`}
              src={chevron}
              alt="chevron"
            />
          </th>
          <th
            className="flex items-center w-2/12 cursor-pointer"
            onClick={handleSortByDividenYield}
          >
            <span>Dividend yield</span>
            <img
              className={`w-4 ml-1${
                dividendYieldOrder === "ASC" ? " transform rotate-180" : ""
              }`}
              src={chevron}
              alt="chevron"
            />
          </th>
        </tr>
      </thead>
      <tbody
        className="block overflow-y-scroll h-80"
        data-testid="shares-table-body"
      >
        {shares.length > 0 &&
          shares.map((share) => <TableRow key={share.id} share={share} />)}
      </tbody>
    </table>
  );
};

export default Table;
