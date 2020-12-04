import React from "react";
import classNames from "classnames/bind";
import "./input.scss";

export interface CommonInputProps {
  id?: string;
  // this should be the div containing the input
  fieldInput?: JSX.Element;
  classes?: string;
  className?: string;
  disabled?: boolean;
  help?: any;
  error?: any;
  inline?: boolean;
  invalid?: boolean;
  label?: string | JSX.Element;
  ariaLabel?: string;
  required?: boolean;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  help,
  error,
  inline,
  fieldInput,
  classes,
}) => {
  const helpMsg = !help ? null : (
    <div className="crl-input__message--info">{help}</div>
  );

  const errorMsg =
    !error || typeof error === "boolean" ? null : (
      <div className="crl-input__message--error">{error}</div>
  );

  return (
    <div
    className={classNames("crl-input__container", classes, {
      "crl-input--inline": inline,
    })}
    >
      {fieldInput}
      <div className="crl-input__message">
        {errorMsg}
        {helpMsg}
      </div>
    </div>
  );
};
