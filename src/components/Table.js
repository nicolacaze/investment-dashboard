import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";

const Table = () => {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/get-shares")
      .then((response) => response.json())
      .then((response) => setShares(response))
      .catch((error) => console.log(error));
  }, []);

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

export default Table;
