import React from "react";
import { shallow, mount } from "enzyme";
import { IconIntent } from "../Icon/Icon";
import { InlineAlert } from "./InlineAlert";

const alertIntents: IconIntent[] = [
  undefined, // should be used default intent
  "warning",
  "success",
  "danger",
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
    const wrapper = mount(<InlineAlert title={title} />);
    expect(wrapper.find(".type-body-strong.title").text()).toContain(title);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders with provided description", () => {
    const description = "Hello world!";
    const wrapper = mount(<InlineAlert description={description} />);
    expect(wrapper.find(".type-body.description").text()).toContain(
      description,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("renders with provided title and description", () => {
    const title = "Hello world!";
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const wrapper = mount(
      <InlineAlert title={title} description={description} />,
    );
    expect(wrapper.find(".type-body-strong").text()).toContain(title);
    expect(wrapper.find(".type-body").text()).toContain(description);
    expect(wrapper).toMatchSnapshot();
  });
});
