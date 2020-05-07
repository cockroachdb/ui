import React from "react";
import { shallow } from "enzyme";
import Input from "./Input";

describe("Input", () => {
  describe("Default props", () => {
    it("provides correct default values to inner <input /> element", () => {
      const wrapper = shallow<HTMLInputElement>(<Input />);
      const props = wrapper.props();
      expect(props.disabled).toBeFalsy();
      expect(props.value).toEqual("");
      expect(props.className).toEqual("input");
      expect(props.name).toBeUndefined();
      expect(props.style).toBeUndefined();
      expect(props.type).toEqual("text");
    });
  });

  describe("Style classes", () => {
    it("sets .disabled class when Input is disabled", () => {
      const wrapper = shallow(<Input disabled />);
      expect(wrapper.hasClass("disabled")).toBeTruthy();
    });

    it("sets .invalid class when Input is disabled", () => {
      const wrapper = shallow(<Input invalid />);
      expect(wrapper.hasClass("invalid")).toBeTruthy();
    });
  });

  describe("onChange handler", () => {
    it("calls callback function with typed text", () => {
      const onChangeSpyFn = jasmine.createSpy();
      const text = "some text";
      const wrapper = shallow(<Input onChange={onChangeSpyFn} />);
      wrapper.simulate("change", { target: { value: text } });
      expect(onChangeSpyFn).toHaveBeenCalledWith(text);
    });

    it("does not call callback when Input is disabled", () => {
      const onChangeSpyFn = jasmine.createSpy();
      const text = "some text";
      const wrapper = shallow(
        <Input onChange={onChangeSpyFn} disabled={true} />,
      );
      wrapper.simulate("change", { target: { value: text } });
      expect(onChangeSpyFn).not.toHaveBeenCalled();
    });
  });
});
