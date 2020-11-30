import React from 'react';
import { BaseTextInput, AllProps } from "./TextTypeInput";
import "./EmailPassword.scss";

export type ExistingPasswordProps = Omit<AllProps, "multiline">;
export type NewPasswordProps = Omit<ExistingPasswordProps, "forgotPasswordLinkDiv">;
export type EmailNumberProps = NewPasswordProps;

export const EmailInput: React.FC<EmailNumberProps> = ({
  ...props
}) => {
  return (
    <BaseTextInput {...props}/>
  );
};

export const NewPasswordInput: React.FC<NewPasswordProps> = ({
  ...props
}) => {
  return (
    <BaseTextInput {...props}/>
  );
};

export const ExistingPasswordInput: React.FC<ExistingPasswordProps> = ({
  ...props
}) => {
  return (
    <BaseTextInput existingPassword={true} {...props}/>
  );
};