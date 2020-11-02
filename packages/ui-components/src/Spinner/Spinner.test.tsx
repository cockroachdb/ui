import React from "react";
import { shallow } from "enzyme";
import { Spinner, SpinnerSize } from "./Spinner";

const spinnerSizes: SpinnerSize[] = ["default", "small", "large"];

describe("Spinner", () => {
  test("renders on a screen", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  spinnerSizes.forEach(size => {
    test(`renders with provided ${size} size`, () => {
      const wrapper = shallow(<Spinner size={size} />);
      expect(wrapper.hasClass(`size-${size}`)).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
