import React from "react";
import chromatism from "chromatism";
import { render, screen } from "@testing-library/react";
import {
  ComponentInlineAlertBackgroundColorInfo,
  ComponentInlineAlertBackgroundColorDanger,
  ComponentInlineAlertBackgroundColorWarning,
  ComponentInlineAlertBackgroundColorSuccess,
} from "@cockroachlabs/design-tokens/dist/web/tokens.module";
import { InlineAlert, InlineAlertIntent } from "./InlineAlert";

describe("InlineAlert", () => {
  test("renders with correct intent", () => {
    const title = "Hello world!";
    const testClassName = "test-classname";
    const alertIntents: Array<[InlineAlertIntent, string]> = [
      ["warning", ComponentInlineAlertBackgroundColorWarning],
      ["success", ComponentInlineAlertBackgroundColorSuccess],
      ["danger", ComponentInlineAlertBackgroundColorDanger],
      ["info", ComponentInlineAlertBackgroundColorInfo],
    ];
    alertIntents.forEach(([intent, color]) => {
      const { container } = render(
        <InlineAlert title={title} intent={intent} className={testClassName} />,
      );
      const elem = container.getElementsByClassName(testClassName);
      const style = window.getComputedStyle(elem[0]);
      expect(chromatism.convert(style.backgroundColor).hex).toBe(color);
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
