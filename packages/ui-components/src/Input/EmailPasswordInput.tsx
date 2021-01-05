import React, { useState, useEffect } from "react";
import { BaseTextInput, AllProps } from "./TextTypeInput";
import "./EmailPassword.module.scss";
import { Icon } from "../Icon/Icon";

// since we use at most one validator currently
// we only want to accept one validator label
export type PasswordProps = AllProps;
export type EmailProps = AllProps;

export enum PasswordInputType {
  Text = "text",
  Password = "password",
}

// types are provided here, because although the Field passes them into these
// Input components, if Input components are used without wrapper Fields,
// they need types
export const EmailInput = (props: EmailProps) => {
  return <BaseTextInput type="email" {...props} />;
};

export const PasswordInput = ({
  meta,
  reveal,
  validatorLabel = undefined,
  newPassword,
  retypePassword,
  ...rest
}: PasswordProps) => {
  const [error, setError] = useState(meta && meta.error);
  const [touched, setTouched] = useState(meta && meta.touched);
  // hidden password will render a password field
  // open password will render a text field
  // the hidden/open state is toggled by the suffix icon
  const [type, setType] = useState<PasswordInputType>(
    PasswordInputType.Password,
  );

  const toggleType = () => {
    setType(
      type === PasswordInputType.Password
        ? PasswordInputType.Text
        : PasswordInputType.Password,
    );
  };

  useEffect(() => {
    setError(meta && meta.error && meta.invalid);
    setTouched(meta && meta.touched);
  }, [meta]);

  // we only want to show the check icon if the user is retyping the password
  // and the password matches the previous password field
  const doesRetypedPasswordMatch = !error && meta && meta.touched && (
    <Icon iconName={"Check"} size="medium" fill="success" />
  );

  const suffixIcon = (
    <div style={{ display: "inline-flex" }}>
      {retypePassword && doesRetypedPasswordMatch}
      {reveal && (
        <Icon
          iconName={type === PasswordInputType.Password ? "Eye" : "EyeOff"}
          size="medium"
          fill={meta && meta.active ? "info" : "default"}
          onClick={toggleType}
        />
      )}
    </div>
  );

  // returns a password input, followed by an icon and message denoting
  // whether validation has been passed
  return (
    <>
      <div className="new-password-input-container">
        <BaseTextInput
          type={type}
          meta={meta}
          {...rest}
          suffix={suffixIcon}
          // for new passwords, the error should reflect whether the password is valid
          // for existing/retyped passwords, the error should be consistent with a standard input error
          {...(newPassword &&
            !retypePassword && {
              error: undefined,
              invalid: meta && meta.touched && meta.invalid,
            })}
        />
      </div>
      {// we don't want to show the validations if the user is retyping password
      // or hasn't begun to type the password
      !retypePassword && touched && validatorLabel && (
        <ul className="new-password-validation-container">
          <li
            key={validatorLabel}
            className={"new-password-validation-message"}
          >
            <div style={{ display: "inline-flex" }}>
              <Icon
                size="small"
                iconName={error ? "CancelCircleFilled" : "CheckCircleFilled"}
                fill={error ? "default" : "success"}
              />
            </div>
            <div className="new-password-validation-label">
              {validatorLabel}
            </div>
          </li>
        </ul>
      )}
    </>
  );
};
