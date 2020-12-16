import React from "react";
import { shallow } from "enzyme";
import { Search } from "@cockroachlabs/icons";
import { TextInput, TextInputProps } from "./index";
import { BaseTextInput } from "./TextTypeInput";

describe("TextInput", () => {
  describe("Default props", () => {
    it("provides correct default values to inner <input /> element", () => {
      const wrapper = shallow<TextInputProps>(<TextInput />);
      const inputWrapper = wrapper.find(BaseTextInput);
      const props = inputWrapper.props();
      expect(props.disabled).toBeFalsy();
      expect(props.value).toBeUndefined();
      expect(props.className).toBeUndefined();
      expect(props.id).toBeUndefined();
    });
  });
  describe("Style classes", () => {
    it("sets disabled prop when Input is disabled", () => {
      const wrapper = shallow(<TextInput disabled />);
      expect(wrapper.props().disabled).toBeTruthy();
    });

    it("sets invalid prop when Input is disabled", () => {
      const wrapper = shallow(<TextInput invalid />);
      expect(wrapper.props().invalid).toBeTruthy();
    });
  });
});

describe("Input with prefixed Icon", () => {
  it("renders Icon with TextInput component", () => {
    const wrapper = shallow(<TextInput suffix={<Search />} />);
    const suffixWrapper = wrapper.find(Search);
    expect(suffixWrapper).toBeDefined();
  });
});
