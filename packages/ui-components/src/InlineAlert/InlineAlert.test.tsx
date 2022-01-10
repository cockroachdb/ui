import React from "react";
import { render, screen } from "@testing-library/react";
import { InlineAlert } from "./InlineAlert";

describe("InlineAlert", () => {
  test("renders with provided title", () => {
    const title = "Hello world!";
    render(<InlineAlert title={title} />);
    screen.getByText(title);
  });

  test("renders with provided description", () => {
    const description = "Hello world!";
    render(<InlineAlert description={description} />);
    screen.getByText(description);
  });

  test("renders with provided title and description", () => {
    const title = "Hello world!";
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    render(<InlineAlert title={title} description={description} />);
    screen.getByText(title);
    screen.getByText(description);
  });
});
