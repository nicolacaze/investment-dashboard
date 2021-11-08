import React, { useState, useEffect } from "react";

const App = () => {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/get-shares")
      .then((response) => response.json())
      .then((response) => setShares(response))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
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
              return (
                <tr key={share.id}>
                  <td>{share.name}</td>
                  <td>{share.ticker}</td>
                  <td>{share.industry}</td>
                  <td>{share.numberOfYears}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
