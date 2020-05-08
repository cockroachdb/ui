import React from "react";
import { shallow, mount } from "enzyme";

import Tooltip from "./Tooltip";

const TooltipExample = (
  <Tooltip content={<div id="content">test</div>}>
    <div id="hoverme">hover me</div>
  </Tooltip>
);

describe("Tooltip", () => {
  test("renders", () => {
    const wrapper = shallow(TooltipExample);
    expect(wrapper).toMatchSnapshot();
  });

  it("is shows children", () => {
    const wrapper = shallow(TooltipExample);
    expect(wrapper.find("#hoverme").text()).toBe("hover me");
  });

  it("is shown on hover", () => {
    const wrapper = mount(TooltipExample);
    expect(wrapper.find(".crl-tooltip").length).toBeFalsy();
    wrapper.find("#hoverme").simulate("mouseEnter");
    expect(wrapper.find(".crl-tooltip").length).toBeTruthy();
  });

  it("is not shown on hover if content is empty", () => {
    const wrapper = mount(
      <Tooltip content={undefined}>
        <div id="hoverme">hover me</div>
      </Tooltip>,
    );
    expect(wrapper.find(".crl-tooltip").length).toBeFalsy();
    wrapper.find("#hoverme").simulate("mouseEnter");
    expect(wrapper.find(".crl-tooltip").length).toBeFalsy();
  });
});
