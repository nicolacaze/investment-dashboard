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
      file: null,
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
      {formik.errors.file ? (
        <div className="bg-yellow-400 rounded mt-5 p-2">
          {formik.errors.file}
        </div>
      ) : null}
    </form>
  );
};

export default UploadForm;
