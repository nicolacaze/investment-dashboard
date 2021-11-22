import React from "react";
import { fireEvent, screen } from "@testing-library/react";

import Layout from "../components/Layout";
import user from "./mocks/user.json";
import { renderWithAuthAndRouter } from "../setupTests";

const mockedNavigate = jest.requireMock("react-router-dom").useNavigate();

describe("User is logged in", () => {
  const isLoggedIn = true;
  const logout = jest.fn();

  beforeEach(() => {
    const providerProps = {
      value: { user, isLoggedIn, logout },
    };
    renderWithAuthAndRouter(<Layout />, { providerProps });
  });

  test("it should render without errors", () => {
    const layoutContainer = screen.getByTestId("layout-container");

    expect(layoutContainer).toBeDefined();
  });

  test("it should render user data", () => {
    const userAvatar = screen.getByTestId("user-avatar");
    const userName = screen.getByTestId("user-name");

    expect(userAvatar).toBeDefined();
    expect(userName).toHaveTextContent(user.user_metadata.full_name);
  });

  test("it should render navigation", () => {
    const navigation = screen.getByRole("navigation");

    expect(navigation).toBeDefined();
  });

  test("it should render logout option", () => {
    const logoutOption = screen.getByText("Log Out");

    expect(logoutOption).toBeDefined();
  });

  test("it should log out user on `logout` option click", () => {
    const loginOption = screen.getByText("Log Out");

    fireEvent.click(loginOption);

    expect(logout).toHaveBeenCalled();
  });

  test("it should redirect to login page after logout", () => {
    const loginOption = screen.getByText("Log Out");

    fireEvent.click(loginOption);

    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });
});

describe("User is logged out", () => {
  const isLoggedIn = false;
  const logout = jest.fn();

  test("it should render login option", () => {
    const providerProps = {
      value: { user, isLoggedIn, logout },
    };
    renderWithAuthAndRouter(<Layout />, { providerProps });
    const loginOption = screen.getByText("Log In");

    expect(loginOption).toBeDefined();
  });
});

test("it should render its children in correct section", () => {
  const isLoggedIn = true;
  const logout = jest.fn();

  const providerProps = {
    value: { user, isLoggedIn, logout },
  };
  const testUi = <div>Hello test</div>;
  renderWithAuthAndRouter(<Layout>{testUi}</Layout>, {
    providerProps,
  });
  const renderedPage = screen.getByTestId("rendered-page");

  expect(renderedPage.children.item("div")).toHaveTextContent("Hello test");
});
