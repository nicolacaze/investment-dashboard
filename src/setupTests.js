import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

import { AppProvider } from "./context/AppContext";

export const renderWithAuthAndRouter = (
  ui,
  { providerProps, ...renderOptions }
) => {
  return render(
    <AppProvider {...providerProps}>
      <Router>{ui}</Router>
    </AppProvider>,
    renderOptions
  );
};

const mockedNavigate = jest.fn();

const Navigate = ({ to }) => {
  return <div to={to}></div>;
};

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate,
    Navigate,
  };
});

global.fetch = jest.fn();
