import React from "react";
import { shallow } from "enzyme";
import { MinusCircle } from "@cockroachlabs/icons";

import Icon, { IconProps, IconSize, IconTint } from "./Icon";

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
      ["xx-large", "size-xx-large"],
    ];

    iconSizes.forEach(([iconSize, expectedClassName]) => {
      wrapper.setProps({ size: iconSize });
      expect(wrapper.prop("className")).toContain(expectedClassName);
    });
  });
});

describe("Icon tint prop", () => {
  test("defaults to neutral", () => {
    const wrapper = renderSubject();
    expect(wrapper.prop("className")).toContain("tint-neutral");
  });

  test("changes the tint of an icon", () => {
    const wrapper = renderSubject();
    const iconTints: Array<[IconTint, string]> = [
      [undefined, "tint-neutral"],
      ["neutral", "tint-neutral"],
      ["inherit", "tint-inherit"],
      ["white", "tint-white"],
      ["red", "tint-red"],
      ["green", "tint-green"],
      ["blue", "tint-blue"],
      ["orange", "tint-orange"],
    ];

    iconTints.forEach(([iconTint, expectedClassName]) => {
      wrapper.setProps({ tint: iconTint });
      expect(wrapper.prop("className")).toContain(expectedClassName);
    });
  });
});
