import React from "react";
import { shallow } from "enzyme";

import Badge, { BadgeProps } from "./Badge";

const defaultProps = {
  content: "foo",
};

const renderSubject = (overrideProps?: BadgeProps) => {
  const props = Object.assign(defaultProps, overrideProps);
  return shallow(<Badge {...props} />);
};

describe("Badge content", () => {
  test("can render using content prop", () => {
    const wrapper = renderSubject({ content: "test" });
    expect(wrapper.prop("children")).toBe("test");
  });

  test("can render using children", () => {
    const wrapper = shallow(<Badge>child content</Badge>);
    expect(wrapper.prop("children")).toBe("child content");
  });

  test("rendered by children should override content from the content prop", () => {
    const wrapper = shallow(
      <Badge content="prop content">child content</Badge>,
    );
    expect(wrapper.prop("children")).toBe("child content");
  });

  test("if empty shouldn't render", () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});

describe("Badge Intent prop", () => {
  test("will be neutral by default", () => {
    const wrapper = renderSubject({ content: "intent test" });
    expect(wrapper.prop("className")).toContain("intent--neutral");
  });

  test("will change the display of a badge", () => {
    const wrapper = renderSubject({ content: "intent test" });

    // success
    wrapper.setProps({ intent: "success" });
    expect(wrapper.prop("className")).toContain("intent--success");

    // warning
    wrapper.setProps({ intent: "warning" });
    expect(wrapper.prop("className")).toContain("intent--warning");

    // danger
    wrapper.setProps({ intent: "danger" });
    expect(wrapper.prop("className")).toContain("intent--danger");

    // neutral
    wrapper.setProps({ intent: "neutral" });
    expect(wrapper.prop("className")).toContain("intent--neutral");
  });
});

test("A badge can render the text case provided by content via a prop", () => {
  const wrapper = renderSubject({ transformCase: "none" });
  expect(wrapper.prop("className")).toContain("transformCase--none");
});
