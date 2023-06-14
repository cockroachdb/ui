import React from "react";
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";
import objectToClassnames from "../utils/objectToClassnames";
import { IconIntent } from "../Icon";

const cx = classNames.bind(styles);

export type SpinnerSize = "default" | "large" | "small" | "x-small";

export type SpinnerFill = IconIntent | "inverted";

type OwnSpinnerProps = {
  size?: SpinnerSize;
  fill?: SpinnerFill;
  className?: string;
};

type NativeSpinnerProps = Omit<
  React.SVGProps<SVGSVGElement>,
  keyof OwnSpinnerProps
>;

export type SpinnerProps = NativeSpinnerProps & OwnSpinnerProps;

export const Spinner: React.FC<SpinnerProps> = ({
  size = "default",
  fill = "default",
  className,
  "aria-label": ariaLabel = "Loading...",
  ...props
}) => {
  const classNames = cx(
    "spinner",
    objectToClassnames({ size, fill }),
    className,
  );
  return (
    <svg
      className={classNames}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      {...props}
    >
      <circle
        fillRule="evenodd"
        clipRule="evenodd"
        stroke="black"
        cx="50"
        cy="50"
        r="44"
        strokeWidth="12"
        strokeDasharray="283"
        strokeDashoffset="75"
        strokeLinecap="round"
      />
    </svg>
  );
};
