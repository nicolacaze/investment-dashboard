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
