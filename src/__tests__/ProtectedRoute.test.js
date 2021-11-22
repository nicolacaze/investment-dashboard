import React from "react";
import { screen } from "@testing-library/react";

import ProtectedRoute from "../components/ProtectedRoute";
import { renderWithAuthAndRouter } from "../setupTests";

test("ProtectedRoute should render its children if user is logged in", () => {
  const isLoggedIn = true;
  const providerProps = {
    value: { isLoggedIn },
  };
  const testUi = <div>Hello test</div>;
  renderWithAuthAndRouter(<ProtectedRoute>{testUi}</ProtectedRoute>, {
    providerProps,
  });
  const renderedPage = screen.getByTestId("protected-route");

  expect(renderedPage.children.item("div")).toHaveTextContent("Hello test");
});

test("it should navigate to login page if user is logged out", () => {
  const isLoggedIn = false;
  const providerProps = {
    value: { isLoggedIn },
  };
  const { container } = renderWithAuthAndRouter(<ProtectedRoute />, {
    providerProps,
  });

  expect(container.firstChild.getAttribute("to")).toBe("/login");
});
