import React, { useState, useEffect } from "react";
import { BaseTextInput, AllProps } from "./TextTypeInput";
import "./EmailPassword.module.scss";
import { Icon } from "../Icon/Icon";

export type ExistingPasswordProps = Omit<AllProps, "multiline">;

// since we use at most one validator currently
// we only want to accept one validator label
export type NewPasswordProps = Omit<
  ExistingPasswordProps & { validatorLabel?: string },
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
export const EmailInput = (props: EmailProps) => {
  return <BaseTextInput type="email" {...props} />;
};

export const NewPasswordInput = ({
  meta,
  validatorLabel = undefined,
  ...rest
}: NewPasswordProps) => {
  const [error, setError] = useState(meta && meta.error);
  const [touched, setTouched] = useState(meta && meta.touched);

  useEffect(() => {
    setError(meta && meta.error && meta.invalid);
    setTouched(meta && meta.touched);
  }, [meta]);

  // returns a password input, followed by an icon and message denoting
  // whether validation has been passed
  return (
    <>
      <div className="new-password-input-container">
        <BaseTextInput
          type="password"
          meta={meta}
          {...rest}
          // we don't want to show standard React Input error in NewPasswordInput fields
          // instead error is indicated by the conditional validation message below
          invalid={meta && meta.touched && meta.invalid}
          error={undefined}
        />
      </div>
      {touched && (validatorLabel !== undefined) && (
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

export const ExistingPasswordInput = (props: ExistingPasswordProps) => {
  return <BaseTextInput type="password" existingPassword={true} {...props} />;
};
