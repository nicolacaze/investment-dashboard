/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";

import App from "../components/App";

test("App should render without errors", () => {
  const wrapper = render(<App />);

  expect(wrapper.container).toBeInTheDocument();
});
