import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button: intent prop", () => {
  it("should default to `secondary`", () => {
    const { getByRole } = render(<Button>intent test</Button>);
    expect(getByRole("button")).toHaveClass("intent-secondary");
  });

  it("should render the button according to the `type` prop value", () => {
    const { rerender } = render(<Button>intent test</Button>);

    // primary
    rerender(<Button intent="primary">intent test</Button>);
    expect(screen.getByRole("button")).toHaveClass("intent-primary");

    // success
    rerender(<Button intent="success">intent test</Button>);
    expect(screen.getByRole("button")).toHaveClass("intent-success");

    // danger
    rerender(<Button intent="danger">intent test</Button>);
    expect(screen.getByRole("button")).toHaveClass("intent-danger");

    // tertiary
    rerender(<Button intent="tertiary">intent test</Button>);
    expect(screen.getByRole("button")).toHaveClass("intent-tertiary");

    // link-style
    rerender(<Button intent="link-style">intent test</Button>);
    expect(screen.getByRole("button")).toHaveClass("intent-link-style");
  });
});

describe("Button: size prop", () => {
  it("should default to `standard`", () => {
    render(<Button>size test</Button>);
    expect(screen.getByRole("button")).toHaveClass("size-standard");
  });

  it("should render the button according to the `size` prop value", () => {
    const { rerender } = render(<Button>size test</Button>);

    // small
    rerender(<Button size="small">size test</Button>);
    expect(screen.getByRole("button")).toHaveClass("size-small");
  });
});

describe("Button: onClick prop", () => {
  it("should call the `onClick` callback when clicked", () => {
    const cb = jest.fn();
    const { getByRole } = render(
      <Button as="button" onClick={cb}>
        onClick test
      </Button>,
    );

    fireEvent.click(getByRole("button"));
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe("Button: as <a>", () => {
  it("should render anchor using as prop", () => {
    render(
      <Button as="a" href="#test">
        anchor
      </Button>,
    );
    expect(screen.getByRole("link").localName).toBe("a");
    expect(screen.getByRole("link")).toHaveAttribute("href", "#test");
  });
});
