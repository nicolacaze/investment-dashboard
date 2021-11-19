import React from "react";
import { render } from "@testing-library/react";

import shares from "./mocks/shares.json";
import TableRow from "../components/TableRow";

let wrapper;

beforeEach(() => {
  wrapper = render(<TableRow share={shares[0]} />);
});

test("TableRow component should render without errors", () => {
  const tableRow = wrapper.getByRole("row");

  expect(tableRow).toBeDefined();
});

test("TableRow should render 6 cells", () => {
  const tableRowCells = wrapper.getAllByRole("cell");

  expect(tableRowCells.length).toBe(6);
});

test("Each cell should render correct data", () => {
  const tableRowCells = wrapper.getAllByRole("cell");

  expect(tableRowCells[0]).toHaveTextContent("1st Source Corporation");
  expect(tableRowCells[1]).toHaveTextContent("SRCE");
  expect(tableRowCells[2]).toHaveTextContent("Banks");
  expect(tableRowCells[3]).toHaveTextContent(34);
  expect(tableRowCells[4]).toHaveTextContent(47.18);
  expect(tableRowCells[5]).toHaveTextContent(2.63);
});
