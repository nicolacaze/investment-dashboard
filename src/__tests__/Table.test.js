import React from "react";
import { render, cleanup } from "@testing-library/react";

import shares from "./mocks/shares.json";
import Table from "../components/Table";

let wrapper;

beforeEach(() => {
  wrapper = render(<Table shares={shares} />);
});

test("Table component should render without errors", () => {
  const table = wrapper.getByTestId("shares-table-list");

  expect(table).toBeDefined();
});

test("It should render the list of shares", () => {
  const table = wrapper.getByTestId("shares-table-list");
  const tableRows = wrapper.getAllByRole("row");

  expect(tableRows.length - 1).toBe(shares.length);
});

test("It should render empty body if there are no shares", () => {
  cleanup();
  const wrapper = render(<Table shares={[]} />);
  const tableBody = wrapper.getByTestId("shares-table-body");
  expect(tableBody.children.length).toBe(0);
});
