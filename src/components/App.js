import React, { useState, useEffect } from "react";

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

const App = () => {
  const [shares, setShares] = useState([]);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
  };

  const handleAttachment = (e) => {
    setForm({ [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = e.target;
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": fields.getAttribute("name"),
        ...form,
      }),
    }).catch((error) => console.error(error));
  };

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
      <form name="contact" method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your Email:{" "}
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:{" "}
            <textarea name="message" onChange={handleChange}></textarea>
          </label>
        </p>
        <p>
          <label>
            File: <input type="file" name="excel" onChange={handleAttachment} />
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
