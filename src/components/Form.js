import React, { useState } from "react";

import { encode } from "../utils";

const Form = () => {
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

  return (
    <>
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
    </>
  );
};

export default Form;
