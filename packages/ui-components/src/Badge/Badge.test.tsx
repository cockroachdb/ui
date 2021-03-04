import React from "react";
import { render, screen } from "@testing-library/react";

import Badge from "./Badge";

describe("Badge content", () => {
  const text = "intent test";
  it("should render using children", () => {
    const { container } = render(<Badge>child content</Badge>);
    expect(container).toMatchSnapshot();
  });

  it("should should return empty div if children is empty", () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });

  describe("Badge Intent prop", () => {
    it("should render the component with neutral intent by default", () => {
      render(<Badge>{text}</Badge>);
      expect(screen.getByText(text)).toHaveClass("intent-neutral");
    });

    it("should able to change the intent type", () => {
      const { rerender } = render(<Badge>{text}</Badge>);

      // success
      rerender(<Badge intent="success">{text}</Badge>);
      expect(screen.getByText(text)).toHaveClass("intent-success");

      // warning
      rerender(<Badge intent="warning">{text}</Badge>);
      expect(screen.getByText(text)).toHaveClass("intent-warning");

      // danger
      rerender(<Badge intent="danger">{text}</Badge>);
      expect(screen.getByText(text)).toHaveClass("intent-danger");

      // info
      rerender(<Badge intent="info">{text}</Badge>);
      expect(screen.getByText(text)).toHaveClass("intent-info");
    });
  });

  it("should not tranform the text passed as a prop", () => {
    render(<Badge transformCase="none">{text}</Badge>);
    expect(screen.getByText(text)).toHaveClass("transformCase-none");
  });
});
