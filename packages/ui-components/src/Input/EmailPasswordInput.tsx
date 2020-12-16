import React, { useState, useEffect } from "react";
import { BaseTextInput, AllProps } from "./TextTypeInput";
import "./EmailPassword.module.scss";
import { Icon } from "../Icon/Icon";

interface Validator {
  label: string;
  fn: (value: string) => boolean;
}

export type ExistingPasswordProps = Omit<AllProps, "multiline">;
export type NewPasswordProps = Omit<
  ExistingPasswordProps & { validators: Validator[] },
  "forgotPasswordLinkElement"
>;
export type EmailProps = NewPasswordProps;

export enum PasswordInputType {
  Text = "text",
  Password = "password",
}

// types are provided here, because although the Field passes them into these
// Input components, if Input components are used without wrapper Fields,
// they need types
export const EmailInput = ({ ...props }: EmailProps) => {
  return <BaseTextInput type="email" {...props} />;
};

export const NewPasswordInput = ({
  meta,
  validators = undefined,
  ...rest
}: NewPasswordProps) => {
  const [error, setError] = useState(meta && meta.error);
  const [touched, setTouched] = useState(meta && meta.touched);

  useEffect(() => {
    setError(meta && meta.error);
    setTouched(meta && meta.touched);
  }, [meta]);

  // validators is a wrapper array of validation functions
  const validator = validators && validators.length > 0 && validators[0];

  // returns a password input, followed by an icon and message denoting
  // whether validation has been passed
  return (
    <>
      <div className="new-password-input-container">
        <BaseTextInput type="password" meta={meta} {...rest} />
      </div>
      {touched && validator && (
        <ul className="new-password-validation-container">
          <li key={validator.label} className={"new-password-input-message"}>
            <div style={{ display: "inline-flex" }}>
              <Icon
                size="small"
                iconName={error ? "CancelCircleFilled" : "CheckCircleFilled"}
                fill={error ? "default" : "success"}
                className={"new-password-input-icon"}
              />
            </div>
            {validator.label}
          </li>
        </ul>
      )}
    </>
  );
};

export const ExistingPasswordInput = ({ ...props }: ExistingPasswordProps) => {
  return <BaseTextInput type="password" existingPassword={true} {...props} />;
};
