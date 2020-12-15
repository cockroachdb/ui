import React from "react";
import classNames from "classnames/bind";
import "./input.module.scss";

export interface CommonInputProps {
  id?: string;
  // this should be the element containing the input
  fieldInput?: JSX.Element;
  classes?: string;
  disabled?: boolean;
  help?: string | JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  inline?: boolean;
  invalid?: boolean;
  label?: string | JSX.Element;
  ariaLabel?: string;
  required?: boolean;
}

// provides a component defining how error and help messages
// are shown in all input types
export const CommonInput: React.FC<CommonInputProps> = ({
  help,
  error,
  inline,
  fieldInput,
  classes,
}) => {
  const helpMsg = !help ? null : <div className="message-info">{help}</div>;

  const errorMsg =
    !error || typeof error === "boolean" ? null : (
      <div className="message-error">{error}</div>
    );

  return (
    <div
      className={classNames("input-container", classes, {
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
