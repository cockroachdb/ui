import React from "react";
import { render, screen } from "@testing-library/react";
import { InlineAlert, InlineAlertIntent } from "./InlineAlert";

describe("InlineAlert", () => {
  test("renders with correct intent", () => {
    const title = "Hello world!";
    const alertIntents: InlineAlertIntent[] = [
      "warning",
      "success",
      "danger",
      "info",
    ];
    alertIntents.forEach((intent) => {
      const { container } = render(
        <InlineAlert title={title} intent={intent} />,
      );
      expect(container.getElementsByClassName(`intent-${intent}`).length).toBe(
        1,
      );
    });
  });

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
