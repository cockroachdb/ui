import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

type OwnInputProps<T = string | number> = {
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
  prefixIcon?: React.ReactNode;
};

type NativeInputProps<T> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof OwnInputProps<T>
>;

export type InputProps<T = string | number> = NativeInputProps<T> &
  OwnInputProps<T>;

const cx = classNames.bind(styles);

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
  ...props
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
          active: !disabled && !invalid,
        },
        className,
      ),
    [className, invalid, disabled],
  );

  return (
    <input
      {...props}
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
