import React from "react";
import { shallow } from "enzyme";
import { InlineAlert, InlineAlertIntent } from "./InlineAlert";

const alertIntents: InlineAlertIntent[] = [
  undefined, // should be used default intent
  "warning",
  "success",
  "error",
  "info",
];

describe("InlineAlert", () => {
  alertIntents.forEach(intent => {
    test(`renders with ${intent} intent`, () => {
      const wrapper = shallow(
        <InlineAlert intent={intent} title="Hello world!" />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  test("renders with provided title", () => {
    const title = "Hello world!";
    const wrapper = shallow(<InlineAlert title={title} />);
    expect(wrapper.text()).toContain(title);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders with provided description", () => {
    const description = "Hello world!";
    const wrapper = shallow(<InlineAlert description={description} />);
    expect(wrapper.text()).toContain(description);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders with provided title and description", () => {
    const title = "Hello world!";
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const wrapper = shallow(
      <InlineAlert title={title} description={description} />,
    );
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(description);
    expect(wrapper).toMatchSnapshot();
  });
});
