import React from "react";
import { useFormik } from "formik";

import { encode } from "../utils";

const Form = () => {
  const onSubmit = (values) => {
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": "upload-file",
        ...values,
      }),
    }).catch((error) => console.error(error));
  };

  const formik = useFormik({
    initialValues: {},
    // validate: validateForm,
    onSubmit,
  });

  const handleAttachment = (e) => {
    formik.setValues({
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <form name="upload-file" method="post" onSubmit={formik.handleSubmit}>
      <input type="hidden" name="form-name" value="upload-file" />
      <label htmlFor="file">File</label>
      <input id="file" type="file" name="file" onChange={handleAttachment} />
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
