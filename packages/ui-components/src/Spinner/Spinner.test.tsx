import React from "react";
import { render, screen } from "@testing-library/react";
import { Spinner, SpinnerSize } from "./Spinner";

const spinnerSizes: SpinnerSize[] = ["default", "small", "large"];

describe("Spinner", () => {
  test("renders on a screen", () => {
    render(<Spinner />);
    screen.getByLabelText("Loading...");
  });

  spinnerSizes.forEach((size) => {
    test(`renders with provided ${size} size`, () => {
      const { container } = render(<Spinner size={size} />);
      expect(container.getElementsByClassName(`size-${size}`).length).toBe(1);
    });
  });
});
