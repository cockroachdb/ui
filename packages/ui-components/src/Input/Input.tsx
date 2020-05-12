import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames/bind";
import { CaretUp, CaretDown } from "@cockroachlabs/icons";
import styles from "./input.module.scss";
import isNumber from "../utils/isNumber";

export interface InputProps<T = string | number> {
  type?: T extends string ? "text" : "number";
  initialValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  style?: CSSProperties;
  autoComplete?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
}

export type NumberInputProps = Omit<InputProps<number>, "type">;
export type TextInputProps = Omit<InputProps<string>, "type">;

const cx = classNames.bind(styles);

interface InputWrapperProps {
  className?: string;
}
const InputWrapper: React.FC<InputWrapperProps> = ({ children, className }) => {
  return <div className={cx("input-wrapper", className)}>{children}</div>;
};

export const BaseInput: React.FC<InputProps> = ({
  name,
  type = "text",
  autoComplete = "off",
  className,
  style,
  value: outerValue = "",
  initialValue = "",
  placeholder,
  onChange,
  disabled = false,
  invalid = false,
}) => {
  const [value, setValue] = useState<string | number>(
    outerValue || initialValue,
  );
  const [isDirty, setDirtyState] = useState<boolean>(false);

  useEffect(() => {
    if (!outerValue && !isDirty) {
      return;
    }
    setDirtyState(true);
    setValue(outerValue);
  }, [outerValue, isDirty]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setDirtyState(true);
      setValue(nextValue);
      if (onChange && !disabled) {
        onChange(nextValue);
      }
    },
    [onChange, disabled],
  );

  const classnames = useMemo(
    () =>
      cx(
        "input",
        {
          disabled,
          invalid,
        },
        className,
      ),
    [className, invalid, disabled],
  );

  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className={classnames}
      style={style}
      onChange={onChangeHandler}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
};

export const TextInput: React.FC<TextInputProps> = props => {
  return <BaseInput {...props} type="text" />;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value: outerValue,
  initialValue,
  ...props
}) => {
  const [value, setValue] = useState<number>(outerValue || initialValue);
  const onSpinClickHandler = useCallback(
    (increase: -1 | 1) => () => {
      const nextValue = value + increase;
      setValue(nextValue);
      onChange(nextValue);
    },
    [value, onChange],
  );

  const onChangeHandler = useCallback(
    (nextValue: string) => {
      const parsedValue = Number(nextValue);
      if (!isNumber(parsedValue)) {
        return;
      }
      setValue(parsedValue);
      onChange(parsedValue);
    },
    [onChange],
  );

  const wrapperClassName = cx("input-number-wrapper");
  const spinButtonsGroupClassName = cx("spin-buttons-group");
  const spinButton = cx("spin-button");

  return (
    <InputWrapper className={wrapperClassName}>
      <BaseInput
        {...props}
        onChange={onChangeHandler}
        value={value}
        initialValue={initialValue}
        type="number"
      />
      <div className={spinButtonsGroupClassName}>
        <div
          className={`${spinButton} spin-button-up`}
          onClick={onSpinClickHandler(1)}
        >
          <CaretUp />
        </div>
        <div
          className={`${spinButton} spin-button-down`}
          onClick={onSpinClickHandler(-1)}
        >
          <CaretDown />
        </div>
      </div>
    </InputWrapper>
  );
};
