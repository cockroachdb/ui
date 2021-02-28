import React from "react";
import { render, screen } from "@testing-library/react";

import Badge from "./Badge";

describe("Badge content", () => {
  it("should render using children", () => {
    const { container } = render(<Badge>child content</Badge>);
    expect(container).toMatchSnapshot();
  });

  it("should should return empty div if children is empty", () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
});

describe("Badge Intent prop", () => {
  it("should render the component with neutral intent by default", () => {
    render(<Badge>intent test</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("intent-neutral");
  });

  it("should able to change the intent type", () => {
    const { rerender } = render(<Badge>intent test</Badge>);

    // success
    rerender(<Badge intent="success">intent test</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("intent-success");

    // warning
    rerender(<Badge intent="warning">intent test</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("intent-warning");

    // danger
    rerender(<Badge intent="danger">intent test</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("intent-danger");

    // info
    rerender(<Badge intent="info">intent test</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("intent-info");
  });
});

it("should not tranform the text passed as a prop", () => {
  render(<Badge transformCase="none">transformCase test</Badge>);
  expect(screen.getByTestId("badge")).toHaveClass("transformCase-none");
});
