import React from "react";
import { fireEvent, screen, waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UploadForm from "../components/UploadForm";
import { encode } from "../utils";

beforeEach(() => {
  render(<UploadForm />);
});

test("It should render without errors", () => {
  const uploadForm = screen.getByRole("form");

  expect(uploadForm).toBeDefined();
});

test("It should have correct fields", () => {
  const fileField = screen.getByLabelText("File");

  expect(fileField).toBeDefined();
});

test("It should have hidden input for Netlify forms bot", () => {
  const hiddenInput = screen.getByAltText("hidden-netlify-input");

  expect(hiddenInput).toBeDefined();
});

test("It should let user select a file", async () => {
  const file = new File(["sample"], "sample.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const fileField = screen.getByLabelText("File");
  const submitButton = screen.getByRole("button");

  userEvent.upload(fileField, file);
  fireEvent.click(submitButton);

  await waitFor(() => expect(fileField.files).not.toHaveLength(0));

  expect(fileField.files[0]).toStrictEqual(file);
  expect(fileField.files).toHaveLength(1);
});

test("It should display error messages if no file is selected", async () => {
  const submitButton = screen.getByRole("button");

  fireEvent.click(submitButton);

  const fileErrors = await screen.findByText("A file is required");

  expect(fileErrors).toBeDefined();
  expect(fileErrors).toHaveTextContent("A file is required");
});

test("It should display error message if file type is invalid", async () => {
  const file = new File(["image"], "image.png", { type: "image/png" });
  const fileField = screen.getByLabelText("File");
  const submitButton = screen.getByRole("button");

  userEvent.upload(fileField, file);
  fireEvent.click(submitButton);

  const fileErrors = await screen.findByText("Only .xlsx file is accepted");

  expect(fileErrors).toBeDefined();
  expect(fileErrors).toHaveTextContent("Only .xlsx file is accepted");
});

test("it should fetch the file when user submit", async () => {
  const file = new File(["sample"], "sample.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const formData = encode({
    "form-name": "upload-file",
    file,
  });
  const fileField = screen.getByLabelText("File");
  const submitButton = screen.getByRole("button");

  userEvent.upload(fileField, file);
  fireEvent.click(submitButton);

  await waitFor(() => expect(fetch).toHaveBeenCalled());

  expect(fetch).toHaveBeenCalledWith("/", { body: formData, method: "POST" });
});
