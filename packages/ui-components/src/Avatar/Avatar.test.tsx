import React from "react";
import { shallow } from "enzyme";

import Avatar, { AvatarIntent, AvatarSize } from "./Avatar";

describe("Avatar", () => {
  describe("Default props", () => {
    it("assigns default style classes based on props", () => {
      const wrapper = shallow(<Avatar>CL</Avatar>);
      const className = wrapper.prop("className");
      expect(className).toContain("intent-default");
      expect(className).toContain("size-default");
      expect(className).toContain("transformCase-uppercase");
      expect(className).not.toContain("disabled");
      expect(className).not.toContain("selectable");
    });
  });

  describe("Handle onClick prop", () => {
    it("calls callback function on element click", () => {
      const onClickSpy = jasmine.createSpy();
      const wrapper = shallow(<Avatar onClick={onClickSpy}>CL</Avatar>);
      wrapper.simulate("click");
      expect(onClickSpy).toHaveBeenCalled();
    });

    it("does not call onClick function when disabled prop is True", () => {
      const onClickSpy = jasmine.createSpy();
      const wrapper = shallow(
        <Avatar disabled={true} onClick={onClickSpy}>
          CL
        </Avatar>,
      );
      wrapper.simulate("click");
      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });

  describe("Content rendering", () => {
    it("renders with string passed as children", () => {
      expect(shallow(<Avatar>foo bar</Avatar>).text()).toEqual("foo bar");
    });

    it("renders with empty content", () => {
      expect(shallow(<Avatar />).text()).toEqual("");
    });
  });

  describe("Intent prop", () => {
    const intents: AvatarIntent[] = ["invalid", "default", "active", "pending"];

    intents.forEach(intent => {
      it("applies correct classNames depending on intent", () => {
        expect(
          shallow(<Avatar intent={intent} />)
            .find("div.avatar")
            .hasClass(`intent-${intent}`),
        ).toBeTruthy();
      });
    });
  });

  describe("Size prop", () => {
    const sizes: AvatarSize[] = ["default", "small"];

    sizes.forEach(size => {
      it("applies correct classNames depending on size", () => {
        expect(
          shallow(<Avatar size={size} />)
            .find("div.avatar")
            .hasClass(`size-${size}`),
        ).toBeTruthy();
      });
    });
  });

  describe("Disabled prop", () => {
    it("excludes intent className", () => {
      const wrapper = shallow(<Avatar intent="invalid" disabled />);
      expect(wrapper.hasClass("disabled")).toBeTruthy();
      expect(wrapper.hasClass("intent-invalid")).toBeFalsy();
    });

    it("excludes selectable className", () => {
      const wrapper = shallow(<Avatar disabled selectable />);
      expect(wrapper.hasClass("disabled")).toBeTruthy();
      expect(wrapper.hasClass("selectable")).toBeFalsy();
    });
  });
});
