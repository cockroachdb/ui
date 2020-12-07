import React from "react";
import { shallow } from "enzyme";
import { MinusCircle } from "@cockroachlabs/icons";

import Icon, { IconProps, IconSize, IconFill } from "./Icon";

const defaultProps = {
  iconName: "Plus",
};

const renderSubject = (overrideProps?: IconProps) => {
  const props = Object.assign(defaultProps, overrideProps);
  return shallow<IconProps>(<Icon {...props} />);
};

test("Icon should render given an iconName", () => {
  const wrapper = renderSubject();
  expect(wrapper).toMatchSnapshot();
});

test("Icon name should correspond to an SVG", () => {
  const wrapper = renderSubject({ iconName: "MinusCircle" });
  expect(wrapper.find(MinusCircle).length).toBe(1);
});

describe("Icon size prop", () => {
  test("will be defaulted", () => {
    const wrapper = renderSubject();
    expect(wrapper.prop("className")).toContain("size-default");
  });

  test("will change the size of the Icon", () => {
    const wrapper = renderSubject();
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
      wrapper.setProps({ size: iconSize });
      expect(wrapper.prop("className")).toContain(expectedClassName);
    });
  });
});

describe("Icon fill prop", () => {
  test("defaults to neutral", () => {
    const wrapper = renderSubject();
    expect(wrapper.prop("className")).toContain("fill-default");
  });

  test("changes the fill of an icon", () => {
    const wrapper = renderSubject();
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
      wrapper.setProps({ fill: iconFill });
      expect(wrapper.prop("className")).toContain(expectedClassName);
    });
  });
});
