import React from "react";
import { render, screen } from "@testing-library/react";
import { TextInput } from "./index";

const INPUT_LABEL = "Test input";

describe("TextInput", () => {
  describe("Default props", () => {
    it("provides correct default values to inner <input /> element", () => {
      render(<TextInput ariaLabel={INPUT_LABEL} />);
      const input = screen.getByLabelText(INPUT_LABEL);
      expect(input).toBeEnabled();
      expect(input).not.toHaveValue();
      expect(input).not.toHaveAttribute("className");
      expect(input).not.toHaveAttribute("id");
    });
  });
  describe("Style classes", () => {
    it("sets disabled prop when Input is disabled", () => {
      render(<TextInput ariaLabel={INPUT_LABEL} disabled />);
      expect(screen.getByLabelText(INPUT_LABEL)).toBeDisabled();
    });

    it("sets invalid prop when Input is disabled", () => {
      render(<TextInput ariaLabel={INPUT_LABEL} invalid />);
      expect(screen.getByLabelText(INPUT_LABEL)).toBeInvalid();
    });
  });
});

describe("Input with prefixed Icon", () => {
  it("renders Icon with TextInput component", () => {
    render(<TextInput ariaLabel={INPUT_LABEL} suffix={<div>Suffix</div>} />);
    screen.getByText("Suffix");
  });
});
