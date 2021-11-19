import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import user from "./mocks/user.json";

let wrapper;

const renderWithAuthAndRouter = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthProvider {...providerProps}>
      <Router>{ui}</Router>
    </AuthProvider>,
    renderOptions
  );
};

beforeEach(() => {
  const providerProps = {
    value: { user, isLoggedIn: true, logout: jest.fn() },
  };
  wrapper = renderWithAuthAndRouter(<Layout />, { providerProps });
});

test("Layout component should render without errors", () => {
  const layoutContainer = wrapper.getByTestId("layout-container");

  expect(layoutContainer).toBeDefined();
});

test.skip("it should render user data", () => {});

test.skip("it should render login option if user is logged out", () => {});

test.skip("it should render logout option if user is logged in", () => {});

test.skip("it should log out user on `logout` option click", () => {});

test.skip("it should redirect to login page after logout", () => {});

test.skip("it should render its children in correct ssection", () => {});
