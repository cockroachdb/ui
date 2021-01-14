import React, { useState, useEffect } from "react";
import { BaseTextInput, TextInputProps } from "./TextTypeInput";
import "./EmailPassword.module.scss";
import { Icon } from "../Icon/Icon";
import { FieldRenderProps } from "react-final-form";

export interface Validator {
  fn: (val: string) => boolean;
  label: string;
}

export interface PasswordProps
  extends Partial<FieldRenderProps<"text", HTMLInputElement>>,
    TextInputProps {
  validatorArray?: Validator[];
  reveal?: boolean;
  newPassword?: boolean;
  retypePassword?: boolean;
}

export enum PasswordInputType {
  Text = "text",
  Password = "password",
}
export const EmailInput = (props: TextInputProps) => (
  <BaseTextInput {...props} type="email" />
);

export const PasswordInput = ({
  meta,
  input,
  reveal,
  validatorArray = undefined,
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
          {...rest}
          type={type}
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
      !retypePassword && touched && validatorArray && (
        <ul className="new-password-validation-container">
          {validatorArray.map((v: Validator) => {
            // TODO: replace once optional chaining is available.
            const value = input ? input.value : undefined;
            const validatorLabel = v.label;
            const passesValidation = typeof value === "string" && v.fn(value);
            <li
              key={validatorLabel}
              className={"new-password-validation-message"}
            >
              <div className={"new-password-validation-icon"}>
                <Icon
                  size="small"
                  iconName={
                    passesValidation
                      ? "CancelCircleFilled"
                      : "CheckCircleFilled"
                  }
                  fill={passesValidation ? "default" : "success"}
                />
              </div>
              <div
                className={
                  passesValidation
                    ? "new-password-validation-success"
                    : "new-password-validation-error"
                }
              >
                {validatorLabel}
              </div>
            </li>;
          })}
        </ul>
      )}
    </>
  );
};
