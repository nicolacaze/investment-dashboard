import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithAuthAndRouter } from "../setupTests";
import LoginForm from "../components/LoginForm";

const mockedNavigate = jest.requireMock("react-router-dom").useNavigate();
const login = jest.fn();

beforeEach(() => {
  const providerProps = {
    value: {
      login,
    },
  };
  renderWithAuthAndRouter(<LoginForm />, { providerProps });
});

test("It should render without errors", () => {
  const loginForm = screen.getByRole("form");

  expect(loginForm).toBeDefined();
});

test("It should have correct fields", () => {
  const emailField = screen.getByLabelText("Email");
  const passwordField = screen.getByLabelText("Password");

  expect(emailField).toBeDefined();
  expect(passwordField).toBeDefined();
});

test("It should display error messages if no email or password are provided", async () => {
  const submitButton = screen.getByRole("button");

  fireEvent.click(submitButton);

  const emailErrors = await screen.findByText("Email is required");
  const passwordErrors = await screen.findByText("Password is required");

  expect(emailErrors).toBeDefined();
  expect(emailErrors).toHaveTextContent("Email is required");
  expect(passwordErrors).toBeDefined();
  expect(passwordErrors).toHaveTextContent("Password is required");
});

test("It should display error message if email is invalid", async () => {
  const emailField = screen.getByLabelText("Email");
  const submitButton = screen.getByRole("button");

  userEvent.type(emailField, "Wrong email format");
  fireEvent.click(submitButton);

  const emailErrors = await screen.findByText("Invalid email address");

  expect(emailErrors).toBeDefined();
  expect(emailErrors).toHaveTextContent("Invalid email address");
});

test("onSubmit click it should login user", async () => {
  const emailField = screen.getByLabelText("Email");
  const passwordField = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button");
  const emailInput = "jason.bourne@gmail.com";
  const passwordInput = "dumbpassword";

  userEvent.type(emailField, emailInput);
  userEvent.type(passwordField, passwordInput);
  fireEvent.click(submitButton);

  await waitFor(() => expect(login).toHaveBeenCalled());

  expect(login).toHaveBeenCalledWith(emailInput, passwordInput);
});

test("onSubmit click it should redirect to homepage", async () => {
  const emailField = screen.getByLabelText("Email");
  const passwordField = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button");

  userEvent.type(emailField, "jason.bourne@gmail.com");
  userEvent.type(passwordField, "dumbpassword");
  fireEvent.click(submitButton);

  await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

  expect(mockedNavigate).toHaveBeenCalledWith("/");
});
