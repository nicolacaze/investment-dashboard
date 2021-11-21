export function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export function validateLoginForm(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateUploadForm(values) {
  const errors = {};

  if (!values.file) {
    errors.file = "A file is required";
  } else if (!/spreadsheetml\.sheet/i.test(values.file.type)) {
    errors.file = "Only .xlsx file is accepted";
  }

  return errors;
}
