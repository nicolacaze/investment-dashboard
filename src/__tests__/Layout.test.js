import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import user from "./mocks/user.json";
import { renderWithAuthAndRouter } from "../setupTests";

let wrapper;
const isLoggedIn = true;
const logout = jest.fn();

const mockedNavigate = jest.requireMock("react-router-dom").useNavigate();

beforeEach(() => {
  const providerProps = {
    value: { user, isLoggedIn, logout },
  };
  wrapper = renderWithAuthAndRouter(<Layout />, { providerProps });
});

test("Layout component should render without errors", () => {
  const layoutContainer = wrapper.getByTestId("layout-container");

  expect(layoutContainer).toBeDefined();
});

test("it should render user data", () => {
  const userAvatar = wrapper.getByTestId("user-avatar");
  const userName = wrapper.getByTestId("user-name");

  expect(userAvatar).toBeDefined();
  expect(userName.textContent).toBe(user.user_metadata.full_name);
});

test("it should render navigation", () => {
  const navigation = wrapper.getByRole("navigation");

  expect(navigation).toBeDefined();
});

test("it should render login option if user is logged out", () => {
  cleanup();
  const providerProps = {
    value: { user, isLoggedIn: false, logout },
  };
  const wrapper = renderWithAuthAndRouter(<Layout />, { providerProps });
  const loginOption = wrapper.getByText("Log In");

  expect(loginOption).toBeDefined();
});

test("it should render logout option if user is logged in", () => {
  const logoutOption = wrapper.getByText("Log Out");

  expect(logoutOption).toBeDefined();
});

test("it should log out user on `logout` option click", () => {
  const loginOption = wrapper.getByText("Log Out");

  fireEvent.click(loginOption);

  expect(logout).toHaveBeenCalled();
});

test("it should redirect to login page after logout", () => {
  const loginOption = wrapper.getByText("Log Out");

  fireEvent.click(loginOption);

  expect(mockedNavigate).toHaveBeenCalledWith("/login");
});

test("it should render its children in correct section", () => {
  cleanup();
  const providerProps = {
    value: { user, isLoggedIn, logout },
  };
  const testUi = <div>Hello test</div>;
  const wrapper = renderWithAuthAndRouter(<Layout>{testUi}</Layout>, {
    providerProps,
  });
  const renderedPage = wrapper.getByTestId("rendered-page");

  expect(renderedPage.children.item("div").textContent).toBe("Hello test");
});
