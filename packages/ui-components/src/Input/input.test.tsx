import React from "react";
import { shallow } from "enzyme";
import { BaseInput, InputProps, NumberInput, TextInput } from "./index";

describe("BaseInput", () => {
  describe("Default props", () => {
    it("provides correct default values to inner <input /> element", () => {
      const wrapper = shallow<HTMLInputElement>(<BaseInput type="text" />);
      const props = wrapper.props();
      expect(props.disabled).toBeFalsy();
      expect(props.value).toEqual("");
      expect(props.className).toEqual("input active");
      expect(props.name).toBeUndefined();
      expect(props.style).toBeUndefined();
      expect(props.type).toEqual("text");
    });
  });

  describe("Style classes", () => {
    it("sets .disabled class when Input is disabled", () => {
      const wrapper = shallow(<BaseInput disabled />);
      expect(wrapper.hasClass("disabled")).toBeTruthy();
    });

    it("sets .invalid class when Input is disabled", () => {
      const wrapper = shallow(<BaseInput invalid />);
      expect(wrapper.hasClass("invalid")).toBeTruthy();
    });
  });

  describe("onChange handler", () => {
    it("calls callback function with typed text", () => {
      const onChangeSpyFn = jasmine.createSpy();
      const text = "some text";
      const wrapper = shallow(<BaseInput onChange={onChangeSpyFn} />);
      wrapper.simulate("change", { target: { value: text } });
      expect(onChangeSpyFn).toHaveBeenCalledWith(text);
    });

    it("does not call callback when Input is disabled", () => {
      const onChangeSpyFn = jasmine.createSpy();
      const text = "some text";
      const wrapper = shallow(
        <BaseInput onChange={onChangeSpyFn} disabled={true} />,
      );
      wrapper.simulate("change", { target: { value: text } });
      expect(onChangeSpyFn).not.toHaveBeenCalled();
    });
  });
});

describe("TextInput", () => {
  describe("Default props", () => {
    it("provides correct default values to inner <input /> element", () => {
      const wrapper = shallow<InputProps>(<TextInput />);
      const props = wrapper.props();
      expect(props.disabled).toBeFalsy();
      expect(props.type).toEqual("text");
      expect(props.initialValue).toBeUndefined();
      expect(props.autoComplete).toBeUndefined();
      expect(props.value).toBeUndefined();
      expect(props.className).toEqual("container");
      expect(props.name).toBeUndefined();
      expect(props.style).toBeUndefined();
    });
  });
});

describe("NumberInput", () => {
  describe("Input field", () => {
    it("calls onChange function when type text", () => {
      const onChangeSpyFn = jasmine.createSpy();
      const wrapper = shallow<HTMLDivElement>(
        <NumberInput onChange={onChangeSpyFn} />,
      );
      const inputWrapper = wrapper.find(BaseInput);
      inputWrapper.prop("onChange")("123");
      expect(onChangeSpyFn).toHaveBeenCalledWith(123);
    });

    it("ignores calls with non-digital characters", () => {
      const onChangeSpyFn = jasmine.createSpy();
      const wrapper = shallow<HTMLDivElement>(
        <NumberInput onChange={onChangeSpyFn} />,
      );
      const inputWrapper = wrapper.find(BaseInput);
      inputWrapper.prop("onChange")("abc");
      expect(onChangeSpyFn).not.toHaveBeenCalled();
    });
  });

  describe("Spin buttons handlers", () => {
    it("increments value by clicking on 'up' spin button", () => {
      const expectedValue = 2;
      const onChangeSpyFn = jasmine.createSpy();
      const wrapper = shallow<HTMLDivElement>(
        <NumberInput initialValue={-1} onChange={onChangeSpyFn} />,
      );
      wrapper.find(".spin-button-up").simulate("click");
      wrapper.find(".spin-button-up").simulate("click");
      wrapper.find(".spin-button-up").simulate("click");
      const inputWrapper = wrapper.find(BaseInput);

      expect(onChangeSpyFn).toHaveBeenLastCalledWith(expectedValue);
      expect(inputWrapper.prop("value")).toEqual(expectedValue);
    });

    it("decrements value by clicking on 'down' spin button", () => {
      const expectedValue = -2;
      const onChangeSpyFn = jasmine.createSpy();
      const wrapper = shallow<HTMLDivElement>(
        <NumberInput initialValue={1} onChange={onChangeSpyFn} />,
      );
      wrapper.find(".spin-button-down").simulate("click");
      wrapper.find(".spin-button-down").simulate("click");
      wrapper.find(".spin-button-down").simulate("click");
      const inputWrapper = wrapper.find(BaseInput);

      expect(inputWrapper.prop("value")).toEqual(expectedValue);
      expect(onChangeSpyFn).toHaveBeenLastCalledWith(expectedValue);
    });
  });
});
