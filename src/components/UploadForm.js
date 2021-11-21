import React from "react";
import { useFormik } from "formik";

import { encode } from "../utils";

const Form = () => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const fields = e.target;
  //   fetch("/", {
  //     method: "POST",
  //     body: encode({
  //       "form-name": fields.getAttribute("name"),
  //       ...form,
  //     }),
  //   }).catch((error) => console.error(error));
  // };

  const onSubmit = async (values) => {
    try {
      fetch("/", {
        method: "POST",
        body: encode({
          "form-name": values.file.name,
          ...values.file,
        }),
      });
    } catch (error) {
      formik.setErrors({ file: error.file });
    }
  };

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    // validate: validateForm,
    onSubmit,
  });

  const handleAttachment = (e) => {
    formik.setFieldValue("file", e.currentTarget.files[0]);
  };

  return (
    <form name="upload-file" method="post" onSubmit={formik.handleSubmit}>
      <input type="hidden" name="form-name" value="upload-file" />
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
