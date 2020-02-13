import React from "react";
import { shallow } from "enzyme";

import Badge from "./Badge";

describe("Badge content", () => {
<<<<<<< HEAD
||||||| merged common ancestors
  test("can render using content prop", () => {
    const wrapper = renderSubject({ content: "test" });
    expect(wrapper.prop("children")).toBe("test");
  });

=======
  test("can render using content prop", () => {
    const wrapper = renderSubject({ content: "test" });
    expect(wrapper).toMatchSnapshot();
  });

>>>>>>> adding snapshots and tokens.scss
  test("can render using children", () => {
    const wrapper = shallow(<Badge>child content</Badge>);
<<<<<<< HEAD
    expect(wrapper).toMatchSnapshot();
||||||| merged common ancestors
    expect(wrapper.prop("children")).toBe("child content");
  });

  test("rendered by children should override content from the content prop", () => {
    const wrapper = shallow(
      <Badge content="prop content">child content</Badge>,
    );
    expect(wrapper.prop("children")).toBe("child content");
=======
    expect(wrapper).toMatchSnapshot();
  });

  test("rendered by children should override content from the content prop", () => {
    const wrapper = shallow(
      <Badge content="prop content">child content</Badge>,
    );
    expect(wrapper).toMatchSnapshot();
>>>>>>> adding snapshots and tokens.scss
  });

  test("if empty shouldn't render", () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Badge Intent prop", () => {
  test("will be neutral by default", () => {
    const wrapper = shallow(<Badge>intent test</Badge>);
    expect(wrapper.prop("className")).toContain("intent-neutral");
  });

  test("will change the display of a badge", () => {
    const wrapper = shallow(<Badge>intent test</Badge>);

    // success
    wrapper.setProps({ intent: "success" });
    expect(wrapper.prop("className")).toContain("intent-success");

    // warning
    wrapper.setProps({ intent: "warning" });
    expect(wrapper.prop("className")).toContain("intent-warning");

    // danger
    wrapper.setProps({ intent: "danger" });
    expect(wrapper.prop("className")).toContain("intent-danger");

    // neutral
    wrapper.setProps({ intent: "neutral" });
    expect(wrapper.prop("className")).toContain("intent-neutral");
  });
});

test("A badge can render the text case provided by content via a prop", () => {
  const wrapper = shallow(
    <Badge transformCase="none">transformCase test</Badge>,
  );
  expect(wrapper.prop("className")).toContain("transformCase-none");
});
