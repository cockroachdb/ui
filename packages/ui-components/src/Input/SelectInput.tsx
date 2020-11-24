import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
  FunctionComponent,
} from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

type inputType = "text" | "number" | "checkbox";

interface TextAndNumberProps<T = string | number> {
  initialValue?: T;
  value?: T;
  maxLength?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  suffix?: JSX.Element;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
  ) => void;
  multiline?: boolean;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
};

interface CheckboxProps {
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

// these props are used in all types of input components
interface CommonInputProps {
  id: string;
  type: inputType;
  // this should be the div containing the input 
  fieldInput: JSX.Element;
  classes?: string;
  className?: string;
  disabled?: boolean;
  help?: any;
  error?: any;
  inline?: boolean;
  invalid?: boolean;
  label?: string | JSX.Element;
  ariaLabel?: string;
}
export interface OptGroup<T> {
  label: string;
  options: Array<Option<T>>;
}

export interface Option<T> {
  key: string | number;
  value: T;
}

// Render menu selections conditional on some prop,
// for example: remove selection from list once selected.
type SelectionsMenuFilter<T> = (
  selection: Option<T>,
  index: number,
  array: Array<Option<T>>,
) => boolean;
export interface SelectInputProps<T> {
  className?: string;
  value: T;
  options: Array<Option<T>> | Array<OptGroup<T>>;
  onChange: (option: Option<T>) => void;
  optionTemplate: FunctionComponent<Option<T>>;
  selectionsMenuFilter?: SelectionsMenuFilter<T>;
  width?: number;
  disabled?: boolean;
  dataTestId?: string;
}

type TextInputProps = CommonInputProps & TextAndNumberProps<string>;
type NumberInputProps = CommonInputProps & TextAndNumberProps<number>;
type CheckboxInputProps = CommonInputProps & CheckboxProps;

const cx = classNames.bind(styles);

export const CommonInput: React.FC<CommonInputProps> = ({
  type,
  id,
  className,
  disabled,
  help,
  error,
  inline,
  invalid,
  label,
  ariaLabel,
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
