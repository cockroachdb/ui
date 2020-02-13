import React from "react";
import { shallow } from "enzyme";

import Sample from "./Sample";

interface OverrideSampleProps {
  content?: string;
  tint?: "default" | "red" | "green" | "blue";
}

const defaultProps = {
  content: "foo",
};

const renderSubject = (overrideProps?: OverrideSampleProps) => {
  const props = Object.assign(defaultProps, overrideProps);
  return shallow(<Sample {...props} />);
};

test("A sample can render content using props", () => {
  const wrapper = renderSubject({ content: "test" });
  expect(wrapper.prop("children")).toBe("test");
});

test("A sample can change its appearance based on intent", () => {
  const wrapper = renderSubject();

  expect(wrapper.prop("className")).toContain("tint--default");

  wrapper.setProps({ tint: "red" });
  expect(wrapper.prop("className")).toContain("tint--red");

  wrapper.setProps({ tint: "green" });
  expect(wrapper.prop("className")).toContain("tint--green");

  wrapper.setProps({ tint: "blue" });
  expect(wrapper.prop("className")).toContain("tint--blue");
});
