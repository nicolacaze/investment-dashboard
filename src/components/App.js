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
          {shares.map((share) => {
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
      <form name="contact" method="post">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <label>
            File: <input type="file" name="excel" />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
};

export default App;
