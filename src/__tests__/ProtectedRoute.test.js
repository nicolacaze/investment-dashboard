import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { renderWithAuthAndRouter } from "../setupTests";

test("ProtectedRoute should render its children if user is logged in", () => {
  const isLoggedIn = true;
  const providerProps = {
    value: { isLoggedIn },
  };
  const testUi = <div>Hello test</div>;
  const wrapper = renderWithAuthAndRouter(
    <ProtectedRoute>{testUi}</ProtectedRoute>,
    {
      providerProps,
    }
  );
  const renderedPage = wrapper.getByTestId("protected-route");

  expect(renderedPage.children.item("div").textContent).toBe("Hello test");
});

test("it should navigate to login page if user is logged out", () => {
  const isLoggedIn = false;
  const providerProps = {
    value: { isLoggedIn },
  };
  const wrapper = renderWithAuthAndRouter(<ProtectedRoute />, {
    providerProps,
  });

  wrapper.debug();

  expect(wrapper.container.firstChild.getAttribute("to")).toBe("/login");
});
