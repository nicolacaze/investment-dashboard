import React from "react";
import { render, screen } from "@testing-library/react";

import shares from "./mocks/shares.json";
import Table from "../components/Table";

test("Table component should render without errors", () => {
  render(<Table shares={shares} />);

  const table = screen.getByTestId("shares-table-list");

  expect(table).toBeDefined();
});

test("It should render the list of shares", () => {
  render(<Table shares={shares} />);

  const tableRows = screen.getAllByRole("row");

  expect(tableRows.length - 1).toBe(shares.length);
});

test("It should render empty body if there are no shares", () => {
  render(<Table shares={[]} />);
  const tableBody = screen.getByTestId("shares-table-body");
  expect(tableBody.children.length).toBe(0);
});
