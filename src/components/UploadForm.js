import React, { useState } from "react";

import { encode } from "../utils";

const Form = () => {
  const [form, setForm] = useState({});

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
    <form name="contact" method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <label htmlFor="file">File</label>
      <input id="file" type="file" name="excel" onChange={handleAttachment} />
      <div className="mt-6">
        <button
          className="bg-dark-gray text-white font-semibold px-6 py-2 rounded"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
