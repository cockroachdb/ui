import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Avatar, { AvatarIntent, AvatarSize } from "./Avatar";

describe("Avatar", () => {
  describe("Default props", () => {
    it("assigns default style classes based on props", () => {
      render(<Avatar>CL</Avatar>);
      const className = screen.getByTestId("avatar").className;
      expect(className).toContain("intent-default");
      expect(className).toContain("size-default");
      expect(className).toContain("transformCase-uppercase");
      expect(className).not.toContain("disabled");
      expect(className).not.toContain("selectable");
    });
  });

  describe("Native element props", () => {
    it("appends user provided className", () => {
      const testClass = "nathan-test-stuff";
      render(<Avatar className={testClass}>NS</Avatar>);
      const className = screen.getByTestId("avatar").className;
      expect(className).toContain(testClass);
      expect(className).toContain("intent-default");
    });

    it("accepts data attributes", () => {
      const datatest = "nathan-data";
      render(<Avatar data-test={datatest}>NS</Avatar>);
      const result = screen.getByTestId("avatar").dataset["test"];
      expect(result).toBe(datatest);
    });
  });

  describe("Handle onClick prop", () => {
    it("calls callback function on element click", () => {
      const onClickSpy = jest.fn();
      render(<Avatar onClick={onClickSpy}>CL</Avatar>);
      fireEvent.click(screen.getByTestId("avatar"));
      expect(onClickSpy).toHaveBeenCalled();
    });

    it("does not call onClick function when disabled prop is True", () => {
      const onClickSpy = jest.fn();
      render(
        <Avatar disabled={true} onClick={onClickSpy}>
          CL
        </Avatar>,
      );
      fireEvent.click(screen.getByTestId("avatar"));
      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });

  describe("Content rendering", () => {
    it("renders with string passed as children", () => {
      render(<Avatar>foo bar</Avatar>);
      expect(screen.getByTestId("avatar")).toHaveTextContent("foo bar");
    });

    it("renders with empty content", () => {
      render(<Avatar />);
      expect(screen.getByTestId("avatar")).toHaveTextContent("");
    });

    it("renders with svg passed as children", () => {
      const svg = <svg />;
      expect(
        render(<Avatar>{svg}</Avatar>)
          .getByTestId("avatar")
          .getElementsByTagName("svg"),
      ).toHaveLength(1);
    });

    it("renders with svg passed as children", () => {
      const img = <img />;
      expect(
        render(<Avatar>{img}</Avatar>)
          .getByTestId("avatar")
          .getElementsByTagName("img"),
      ).toHaveLength(1);
    });
  });

  describe("Intent prop", () => {
    const intents: AvatarIntent[] = ["invalid", "default", "active", "pending"];

    intents.forEach(intent => {
      it("applies correct classNames depending on intent", () => {
        expect(
          render(<Avatar intent={intent} />).getByTestId("avatar").className,
        ).toContain(`intent-${intent}`);
      });
    });
  });

  describe("Size prop", () => {
    const sizes: AvatarSize[] = ["default", "small"];

    sizes.forEach(size => {
      it("applies correct classNames depending on size", () => {
        expect(
          render(<Avatar size={size} />).getByTestId("avatar").className,
        ).toContain(`size-${size}`);
      });
    });
  });

  describe("Disabled prop", () => {
    it("excludes intent className", () => {
      const { getByTestId } = render(<Avatar intent="invalid" disabled />);
      const className = getByTestId("avatar").className;
      expect(className.includes("disabled")).toBeTruthy();
      expect(className.includes("intent-invalid")).toBeFalsy();
    });

    it("excludes selectable className", () => {
      const { getByTestId } = render(<Avatar disabled selectable />);
      const className = getByTestId("avatar").className;
      expect(className.includes("disabled")).toBeTruthy();
      expect(className.includes("selectable")).toBeFalsy();
    });
  });
});
