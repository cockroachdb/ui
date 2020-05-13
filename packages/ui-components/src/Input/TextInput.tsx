import React from "react";
import { BaseInput, InputProps } from "./BaseInput";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

export type TextInputProps = Omit<InputProps<string>, "type">;

const cx = classNames.bind(styles);

export const TextInput: React.FC<TextInputProps> = props => {
  return (
    <BaseInput
      {...props}
      type="text"
      className={cx("container", props.className)}
    />
  );
};
