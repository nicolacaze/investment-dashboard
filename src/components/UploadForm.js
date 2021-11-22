import React from "react";
import { useFormik } from "formik";

import { encode, validateUploadForm } from "../utils";

const UploadForm = () => {
  const onSubmit = async (values) => {
    try {
      await fetch("/", {
        method: "POST",
        body: encode({
          "form-name": "upload-file",
          ...values,
        }),
      });
    } catch (error) {
      formik.setErrors({ file: error.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      file: "",
    },
    validate: validateUploadForm,
    onSubmit,
  });

  const handleAttachment = (e) => {
    formik.setValues({
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <form name="upload-file" method="post" onSubmit={formik.handleSubmit}>
      <input
        type="hidden"
        name="form-name"
        value="upload-file"
        alt="hidden-netlify-input"
      />
      <label htmlFor="file">File</label>
      <input id="file" type="file" name="file" onChange={handleAttachment} />
      <button
        className="mt-6 bg-dark-gray text-white font-semibold px-6 py-2 rounded"
        type="submit"
      >
        Send
      </button>
      {formik.errors.file ? (
        <div className="bg-yellow-400 rounded mt-5 p-2">
          {formik.errors.file}
        </div>
      ) : null}
    </form>
  );
};

export default UploadForm;
