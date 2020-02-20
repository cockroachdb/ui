import React from "react";
import { shallow } from "enzyme";
import { MinusCircle } from "@cockroachlabs/icons";

import Icon, { IconProps } from "./Icon";

const defaultProps = {
  iconName: "Plus",
};

const renderSubject = (overrideProps?: IconProps) => {
  const props = Object.assign(defaultProps, overrideProps);
  return shallow(<Icon {...props} />);
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

    wrapper.setProps({ size: "large" });
    expect(wrapper.prop("className")).toContain("size-large");

    wrapper.setProps({ size: "medium" });
    expect(wrapper.prop("className")).toContain("size-medium");

    wrapper.setProps({ size: "small" });
    expect(wrapper.prop("className")).toContain("size-small");

    wrapper.setProps({ size: "tiny" });
    expect(wrapper.prop("className")).toContain("size-tiny");
  });
});

describe("Icon tint prop", () => {
  test("defaults to neutral", () => {
    const wrapper = renderSubject();
    expect(wrapper.prop("className")).toContain("tint-neutral");
  });

  test("changes the tint of an icon", () => {
    const wrapper = renderSubject();

    wrapper.setProps({ tint: "blue" });
    expect(wrapper.prop("className")).toContain("tint-blue");

    wrapper.setProps({ tint: "green" });
    expect(wrapper.prop("className")).toContain("tint-green");

    wrapper.setProps({ tint: "purple" });
    expect(wrapper.prop("className")).toContain("tint-purple");

    wrapper.setProps({ tint: "red" });
    expect(wrapper.prop("className")).toContain("tint-red");

    wrapper.setProps({ tint: "white" });
    expect(wrapper.prop("className")).toContain("tint-white");

    wrapper.setProps({ tint: "neutral" });
    expect(wrapper.prop("className")).toContain("tint-neutral");

    wrapper.setProps({ tint: "inherit" });
    expect(wrapper.prop("className")).toContain("tint-inherit");
  });
});
