import React from "react";
import { shallow } from "enzyme";

import Badge from "./Badge";

interface OverrideBadgeProps {
  content?: string;
  intent?: "default" | "success" | "warning" | "danger";
  noTransform?: boolean;
}

const defaultProps = {
  content: "foo",
};

const renderSubject = (overrideProps?: OverrideBadgeProps) => {
  const props = Object.assign(defaultProps, overrideProps);
  return shallow(<Badge {...props} />);
};

test("A badge can render content using props", () => {
  const wrapper = renderSubject({ content: "test" });
  expect(wrapper.prop("children")).toBe("test");
});

test("A badge can change its appearance based on intent", () => {
  const wrapper = renderSubject();

  // default
  expect(wrapper.prop("className")).toBe("badge default");

  // success
  wrapper.setProps({ intent: "success" });
  expect(wrapper.prop("className")).toBe("badge success");

  // warning
  wrapper.setProps({ intent: "warning" });
  expect(wrapper.prop("className")).toBe("badge warning");

  // danger
  wrapper.setProps({ intent: "danger" });
  expect(wrapper.prop("className")).toBe("badge danger");
});

test("A badge can render the text case provided by content via a prop", () => {
  const wrapper = renderSubject({ noTransform: true });
  expect(wrapper.prop("className")).toBe("badge default noTransform");
});
