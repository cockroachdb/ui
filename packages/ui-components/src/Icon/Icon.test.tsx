import React from "react";
import { render, screen } from "@testing-library/react";

import Icon, { IconProps, IconSize, IconFill } from "./Icon";

const defaultProps: IconProps = {
  iconName: "Plus",
};

test("Icon name should correspond to an SVG", () => {
  render(<Icon iconName="MinusCircle" aria-label="circle svg" />);
  // If a corresponding SVG isn't found, nothing is rendered.
  screen.getByLabelText("circle svg");
});

describe("Icon size prop", () => {
  test("will be defaulted", () => {
    const { container } = render(<Icon {...defaultProps} />);
    expect(container.getElementsByClassName("size-default").length).toBe(1);
  });

  test("will change the size of the Icon", () => {
    const iconSizes: Array<[IconSize, string]> = [
      [undefined, "size-default"],
      ["default", "size-default"],
      ["small", "size-small"],
      ["medium", "size-medium"],
      ["large", "size-large"],
      ["x-large", "size-x-large"],
      ["tiny", "size-tiny"],
    ];

    iconSizes.forEach(([iconSize, expectedClassName]) => {
      const { container } = render(<Icon {...defaultProps} size={iconSize} />);
      expect(container.getElementsByClassName(expectedClassName).length).toBe(
        1,
      );
    });
  });
});

describe("Icon fill prop", () => {
  test("defaults to neutral", () => {
    const { container } = render(<Icon {...defaultProps} />);
    expect(container.getElementsByClassName("fill-default").length).toBe(1);
  });

  test("changes the fill of an icon", () => {
    const iconFills: Array<[IconFill, string]> = [
      ["danger", "fill-danger"],
      ["inverted", "fill-inverted"],
      ["disabled", "fill-disabled"],
      ["disabled-light", "fill-disabled-light"],
      ["info", "fill-info"],
      ["primary", "fill-primary"],
      ["success", "fill-success"],
      ["warning", "fill-warning"],
    ];

    iconFills.forEach(([iconFill, expectedClassName]) => {
      const { container } = render(<Icon {...defaultProps} fill={iconFill} />);
      expect(container.getElementsByClassName(expectedClassName).length).toBe(
        1,
      );
    });
  });
});
