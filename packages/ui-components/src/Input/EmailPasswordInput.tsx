import React, { useState, useEffect } from 'react';
import { BaseTextInput, AllProps } from "./TextTypeInput";
import "./EmailPassword.scss";
import { Icon } from "../Icon/Icon";
import classNames from "classnames";

interface Validator {
  label: string;
  fn: (value: string) => boolean;
}

export type ExistingPasswordProps = Omit<AllProps, "multiline">;
export type NewPasswordProps = Omit<ExistingPasswordProps & {validators: Validator[]}, "forgotPasswordLinkElement">;
export type EmailNumberProps = NewPasswordProps;

export enum PasswordInputType {
  Text = "text",
  Password = "password",
}


// textTypes are provided here, because although the Field passes them into these
// Inptu components, if Input components are used without wrapper Fields,
// they need types
export const EmailInput: React.FC<EmailNumberProps> = props => {
  return (
    <BaseTextInput type="email" {...props}/>
  );
};

export const NewPasswordInput: React.FC<NewPasswordProps> = props => {
  const { meta, validators } = props;
  const [error, setError] = useState(meta && meta.error);
  const [touched, setTouched] = useState(meta && meta.touched);

  useEffect(()=> {
    setError(meta && meta.error);
    setTouched(meta && meta.touched);
  }, [meta]);

  const validator = validators[0];
  return (
    <>
    <div className="new-password-input-container">
      <BaseTextInput type="password" {...props} />
    </div>
    {touched && (
      <ul className="new-password-validation-container">
        <li
          key={validator.label}
          className={"new-password-input-message"}
        >
          <Icon
            size="medium"
            iconName={error ? "CancelCircleFilled" : "CheckCircleFilled"}
            intent={error ?  "default" : "success"}
            className={"new-password-input-icon"}
          />
          {validator.label}
        </li>
      </ul>
    )}
  </>);
};

export const ExistingPasswordInput: React.FC<ExistingPasswordProps> = props => {
  return (
    <BaseTextInput type="password" existingPassword={true} {...props}/>
  );
};