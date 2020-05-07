import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames/bind";
import styles from "./input.module.scss";

export interface InputProps {
  type?: string;
  className?: string;
  style?: CSSProperties;
  initialValue?: string;
  value?: string;
  autoComplete?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
}

const cx = classNames.bind(styles);

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  autoComplete = "off",
  className,
  style,
  value: outerValue,
  initialValue = "",
  placeholder,
  onChange,
  disabled = false,
  invalid = false,
}) => {
  const [value, setValue] = useState(outerValue || initialValue);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange && !disabled) {
        onChange(event.target.value);
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

export default Input;
