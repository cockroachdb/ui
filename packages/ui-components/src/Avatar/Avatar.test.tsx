import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import UiAvatar, { AvatarIntent, AvatarSize, AvatarProps } from "./Avatar";

const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => (
  <UiAvatar data-testid="avatar" {...props}>
    {children}
  </UiAvatar>
);

describe("Avatar", () => {
  describe("Default props", () => {
    it("assigns default style classes based on props", () => {
      render(<Avatar>CL</Avatar>);
      expect(screen.getByTestId("avatar")).toHaveClass(
        "intent-default",
        "size-default",
        "transformCase-uppercase",
      );
      expect(screen.getByTestId("avatar")).not.toHaveClass(
        "disabled",
        "selectable",
      );
    });
  });

  describe("Native element props", () => {
    it("appends user provided className", () => {
      const testClass = "nathan-test-stuff";
      render(<Avatar className={testClass}>NS</Avatar>);
      expect(screen.getByTestId("avatar")).toHaveClass(
        testClass,
        "intent-default",
      );
    });

    it("accepts data attributes", () => {
      const datatest = "nathan-data";
      render(<Avatar data-test={datatest}>NS</Avatar>);
      expect(screen.getByTestId("avatar")).toHaveAttribute(
        "data-test",
        datatest,
      );
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
          render(<Avatar intent={intent} />).getByTestId("avatar"),
        ).toHaveClass(`intent-${intent}`);
      });
    });
  });

  describe("Size prop", () => {
    const sizes: AvatarSize[] = ["default", "small"];

    sizes.forEach(size => {
      it("applies correct classNames depending on size", () => {
        expect(
          render(<Avatar size={size} />).getByTestId("avatar"),
        ).toHaveClass(`size-${size}`);
      });
    });
  });

  describe("Disabled prop", () => {
    it("excludes intent className", () => {
      render(<Avatar intent="invalid" disabled />);
      expect(screen.getByTestId("avatar")).toHaveClass("disabled");
      expect(screen.getByTestId("avatar")).not.toHaveClass("intent-invalid");
    });

    it("excludes selectable className", () => {
      render(<Avatar disabled selectable />);
      expect(screen.getByTestId("avatar")).toHaveClass("disabled");
      expect(screen.getByTestId("avatar")).not.toHaveClass("selectable");
    });
  });
});
