import React from "react";
import classNames from "classnames/bind";
import "./input.module.scss";

export interface CommonInputProps {
  // this should be the element containing the input
  fieldInput?: JSX.Element;
  className?: string;
  help?: string | JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  inline?: boolean;
  // used in Checkbox, TextType Inputs, which render CommonInput
  invalid?: boolean;
  label?: string | JSX.Element;
  ariaLabel?: string;
}

// a component defining how error and help messages
// are shown in all input types
export const CommonInput = ({
  help,
  error,
  inline,
  fieldInput,
  className,
}: CommonInputProps) => {
  const helpMsg = !help ? null : <div className="message-info">{help}</div>;

  const errorMsg =
    !error || typeof error === "boolean" ? null : (
      <div className="message-error">{error}</div>
    );

  return (
    <div
      className={classNames("input-container", className, {
        inline: inline,
      })}
    >
      {fieldInput}
      <div className="message">
        {errorMsg}
        {helpMsg}
      </div>
    </div>
  );
};
