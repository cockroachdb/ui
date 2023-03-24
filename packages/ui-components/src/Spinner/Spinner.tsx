import React from "react";
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";
import objectToClassnames from "../utils/objectToClassnames";

const cx = classNames.bind(styles);

export type SpinnerSize = "default" | "large" | "small";

type OwnSpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

type NativeSpinnerProps = Omit<
  React.SVGProps<SVGSVGElement>,
  keyof OwnSpinnerProps
>;

export type SpinnerProps = NativeSpinnerProps & OwnSpinnerProps;

export const Spinner: React.FC<SpinnerProps> = ({
  size = "default",
  className,
}) => {
  const classNames = cx("spinner", objectToClassnames({ size }), className);
  return (
    <svg
      className={classNames}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading..."
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
