import React, { useCallback, useMemo } from "react";
import classNames from "classnames/bind";

import styles from "./Avatar.module.scss";
import objectToClassnames from "../utils/objectToClassnames";

interface OwnAvatarProps {
  size?: AvatarSize;
  intent?: AvatarIntent;
  disabled?: boolean;
  selectable?: boolean;
  onClick?: () => void;
  transformCase?: AvatarCase;
}

type NativeDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  keyof OwnAvatarProps
>;

export type AvatarProps = NativeDivProps & OwnAvatarProps;

export type AvatarSize = "default" | "small";
export type AvatarIntent = "default" | "active" | "pending" | "invalid";
export type AvatarCase = "none" | "uppercase";

const cx = classNames.bind(styles);

export const Avatar: React.FC<AvatarProps> = ({
  children,
  className,
  intent = "default",
  size = "default",
  disabled = false,
  selectable = false,
  onClick,
  transformCase = "uppercase",
  ...rest
}) => {
  const classnames = useMemo(
    () =>
      cx(
        "avatar",
        objectToClassnames({ size, transformCase }),
        {
          disabled,
          selectable: !disabled && selectable,
          [`intent-${intent}`]: !disabled,
        },
        className,
      ),
    [intent, size, disabled, selectable, transformCase, className],
  );

  const onClickHandler = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [onClick, disabled]);

  return (
    <div className={classnames} onClick={onClickHandler} {...rest}>
      {children}
    </div>
  );
};

export default Avatar;
