import React from "react";
import { shallow } from "enzyme";

import Button from "./Button";

describe("Button: intent prop", () => {
  it("should default to `secondary`", () => {
    const wrapper = shallow(<Button>intent test</Button>);
    expect(wrapper.prop("className")).toContain("intent-secondary");
  });

  it("should render the button according to the `type` prop value", () => {
    const wrapper = shallow(<Button>intent test</Button>);

    // primary-success
    wrapper.setProps({ intent: "primary-success" });
    expect(wrapper.prop("className")).toContain("intent-primary-success");

    // primary-danger
    wrapper.setProps({ intent: "primary-danger" });
    expect(wrapper.prop("className")).toContain("intent-primary-danger");

    // secondary
    wrapper.setProps({ intent: "secondary" });
    expect(wrapper.prop("className")).toContain("intent-secondary");

    // tertiary
    wrapper.setProps({ intent: "tertiary" });
    expect(wrapper.prop("className")).toContain("intent-tertiary");
  });
});

describe("Button: size prop", () => {
  it("should default to `standard`", () => {
    const wrapper = shallow(<Button>size test</Button>);
    expect(wrapper.prop("className")).toContain("size-standard");
  });

  it("should render the button according to the `size` prop value", () => {
    const wrapper = shallow(<Button>size test</Button>);

    // primary-success
    wrapper.setProps({ size: "small" });
    expect(wrapper.prop("className")).toContain("size-small");

    // primary-danger
    wrapper.setProps({ size: "standard" });
    expect(wrapper.prop("className")).toContain("size-standard");
  });
});

describe("Button: onClick prop", () => {
  it("should call the `onClick` callback when clicked", () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <Button as="button" onClick={cb}>
        onClick test
      </Button>,
    );

    wrapper.find("button").simulate("click");
    expect(cb.mock.calls.length).toEqual(1);
  });
});

describe("Button: as <a>", () => {
  it("should render anchor using as prop", () => {
    const wrapper = shallow(
      <Button as="a" href="#test">
        anchor
      </Button>,
    );
    expect(wrapper.name()).toEqual("a");
    expect(wrapper.prop("href")).toContain("#");
  });
});
