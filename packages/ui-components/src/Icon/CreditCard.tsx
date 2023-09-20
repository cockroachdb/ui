import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";

import { Cards } from "@cockroachlabs/icons";
import styles from "./card.module.scss";

import objectToClassNames from "../utils/objectToClassnames";

export type CreditCardSize = "tiny" | "small" | "medium" | "large";

type OwnCreditCardProps = {
  creditCardName?: keyof typeof Cards;
  size?: CreditCardSize;
};

export type CreditCardProps = SVGProps<SVGSVGElement> & OwnCreditCardProps;

const cx = classnames.bind(styles);

export const CreditCard = ({
  creditCardName = "CreditCard",
  size = "small",
  className,
  ...props
}: CreditCardProps) => {
  const classNames = useMemo(
    () => cx("card", objectToClassNames({ size }), className),
    [className, size],
  );
  const Element = Cards[creditCardName];

  if (Element == null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
