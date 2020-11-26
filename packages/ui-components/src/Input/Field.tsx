import React, { FunctionComponent } from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";

import { TextTypeInput, AllProps, EmailInput, NewPasswordInput, ExistingPasswordInput } from "./TextTypeInput";
import { CheckboxInput, CheckboxInputProps } from "./CheckboxInput";
import { NumberInput } from "./NumberInput";

type TextInputFieldProps = FieldProps<
  string,
  FieldRenderProps<string, HTMLElement>,
  HTMLElement
> &
AllProps;

type CheckboxInputFieldProps = FieldProps<
  boolean,
  FieldRenderProps<boolean, HTMLElement>,
  HTMLElement
> &
  CheckboxInputProps;

const InputField: FunctionComponent<TextInputFieldProps | CheckboxInputFieldProps> = props => {
  const {
    afterSubmit,
    allowNull = false,
    beforeSubmit,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    parse,
    subscription,
    type,
    validate,
    validateFields,
    name,
    ...inputProps
  } = props;
  return (
    <Field
      afterSubmit={afterSubmit}
      allowNull={allowNull}
      beforeSubmit={beforeSubmit}
      format={format}
      formatOnBlur={formatOnBlur}
      initialValue={initialValue}
      isEqual={isEqual}
      parse={parse}
      subscription={subscription}
      type={type}
      validate={validate}
      validateFields={validateFields}
      name={name}
      render={({ input, meta }) => (
        <>
         {type ==="text" && <TextTypeInput
          {...input}
          {...inputProps}
          error={meta.touched && meta.error}
        />}

          {type ==="checkbox" && <CheckboxInput
          {...input}
          {...inputProps}
          error={meta.touched && meta.error}
        />}

          {type ==="number" && <NumberInput
          {...input}
          {...inputProps}
          error={meta.touched && meta.error}
        />}

          {type ==="email" && <EmailInput
                    {...input}
                    {...inputProps}
                    error={meta.touched && meta.error}
                  />}

          {type ==="new password" && <NewPasswordInput
                    {...input}
                    {...inputProps}
                    error={meta.touched && meta.error}
                  />}

          {type ==="existing password" && <ExistingPasswordInput
          {...input}
          {...inputProps}
          error={meta.touched && meta.error}
        />}
        </>
      )}
    />
  );
};

export default InputField;
