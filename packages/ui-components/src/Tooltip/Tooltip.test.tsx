import React from "react";
import { shallow } from "enzyme";

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
    const wrapper = shallow(TooltipExample);
    expect(wrapper.find("[data-show]").length).toBeFalsy();
    setTimeout(() => {
      wrapper.find("#hoverme").simulate("mouseOver");
      expect(wrapper.find("[data-show]").length).toBeTruthy();
    }, 0);
  });

  it("is not shown on hover if content is empty", () => {
    const wrapper = shallow(
      <Tooltip content={undefined}>
        <div id="hoverme">hover me</div>
      </Tooltip>,
    );
    expect(wrapper.find('[data-jest="tooltip"]').length).toBeFalsy();
    setTimeout(() => {
      wrapper.find("#hoverme").simulate("mouseOver");
      expect(wrapper.find('[data-jest="tooltip"]').length).toBeFalsy();
    }, 0);
  });
});
