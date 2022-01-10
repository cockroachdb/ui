import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import { Tooltip } from "./Tooltip";

const TRIGGER_TEXT = "hover trigger";
const HOVER_TEXT = "hover text";

const TooltipExample = (
  <Tooltip content={<div id="content">{HOVER_TEXT}</div>}>
    <div>{TRIGGER_TEXT}</div>
  </Tooltip>
);

describe("Tooltip", () => {
  it("is shown on hover", () => {
    render(TooltipExample);
    expect(screen.getByText(HOVER_TEXT)).not.toHaveAttribute("data-show");
    fireEvent.mouseOver(screen.getByText(TRIGGER_TEXT));
    waitFor(() => {
      expect(screen.getByText(HOVER_TEXT)).toHaveAttribute("data-show");
    });
  });

  it("is not shown on hover if content is empty", () => {
    const { container } = render(
      <Tooltip content={undefined}>
        <div>{TRIGGER_TEXT}</div>
      </Tooltip>,
    );
    expect(container.querySelector('[data-jest="tooltip"]')).toBeNull();
    fireEvent.mouseOver(screen.getByText(TRIGGER_TEXT));
    expect(container.querySelector('[data-jest="tooltip"]')).toBeNull();
  });
});
