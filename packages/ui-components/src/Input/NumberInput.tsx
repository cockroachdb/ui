import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import { CaretUp, CaretDown } from "@cockroachlabs/icons";
import isNumber from "../utils/isNumber";
import { BaseInput, InputProps } from "./BaseInput";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export type NumberInputProps = Omit<InputProps<number>, "type">;

interface InputWrapperProps {
  className?: string;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children, className }) => {
  return <div className={cx(className)}>{children}</div>;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value: outerValue,
  initialValue,
  ...props
}) => {
  const { invalid, disabled, className } = props;
  const [value, setValue] = useState<number>(outerValue || initialValue);
  const onSpinClickHandler = useCallback(
    (increase: -1 | 1) => () => {
      if (disabled) {
        return;
      }
      const nextValue = value + increase;
      setValue(nextValue);
      onChange(nextValue);
    },
    [value, onChange, disabled],
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

  const wrapperClassName = cx(
    "container",
    "number-type",
    {
      active: !invalid && !disabled,
      disabled: disabled,
      invalid: invalid,
    },
    className,
  );
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
        <button
          className={`${spinButton} spin-button-up`}
          onClick={onSpinClickHandler(1)}
        >
          <CaretUp />
        </button>
        <button
          className={`${spinButton} spin-button-down`}
          onClick={onSpinClickHandler(-1)}
        >
          <CaretDown />
        </button>
      </div>
    </InputWrapper>
  );
};
