import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import { CaretUp, CaretDown } from "@cockroachlabs/icons";
import isNumber from "../utils/isNumber";
import { NumberInput, NumberProps } from "./TextTypeInput";
import styles from "./styles.module.scss";
import { InputPrefix, InputWrapper } from "./helpers";

const cx = classNames.bind(styles);

export type NumberInputProps = NumberProps & {
  onChange?: (value: number) => void;
};

// Use NumberInput instead of this
export const DeprecatedNumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value: outerValue,
  initialValue,
  prefix,
  invalid,
  disabled,
  ...props
}) => {
  const [value, setValue] = useState<number>(outerValue || initialValue || 0);
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

  const spinButtonsGroupClassName = cx("spin-buttons-group");
  const spinButton = cx("spin-button");

  return (
    <InputWrapper disabled={disabled} invalid={invalid} className="number-type">
      <InputPrefix>{prefix}</InputPrefix>
      <NumberInput
        {...props}
        disabled={disabled}
        invalid={invalid}
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
