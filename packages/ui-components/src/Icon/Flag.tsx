import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Flags } from "@cockroachlabs/icons";
import styles from "./card.module.scss";

import objectToClassNames from "../utils/objectToClassnames";

export type FlagSize = "tiny" | "small" | "medium" | "large";

type OwnBaseFlagProps = {
  size?: FlagSize;
};

type OwnFlagPropsWithFlagName = {
  flagName: keyof typeof Flags;
  countryCode?: string;
};

type OwnFlagPropsWithCountryCode = {
  flagName?: keyof typeof Flags;
  countryCode: string;
};

type FlagProps = SVGProps<SVGElement> &
  OwnBaseFlagProps &
  (OwnFlagPropsWithFlagName | OwnFlagPropsWithCountryCode);

const cx = classnames.bind(styles);

export const flagNameCountryCodeMap: Array<{
  code: string;
  flag: keyof typeof Flags;
}> = [
  { code: "aus", flag: "Australia" },
  { code: "bel", flag: "Belgium" },
  { code: "bhr", flag: "Bahrain" },
  { code: "bra", flag: "Brazil" },
  { code: "can", flag: "Canada" },
  { code: "che", flag: "Switzerland" },
  { code: "deu", flag: "Germany" },
  { code: "fin", flag: "Finland" },
  { code: "fra", flag: "France" },
  { code: "gbr", flag: "UnitedKingdom" },
  { code: "hkg", flag: "HongKong" },
  { code: "ind", flag: "India" },
  { code: "idn", flag: "Indonesia" },
  { code: "irl", flag: "Ireland" },
  { code: "jpn", flag: "Japan" },
  { code: "kor", flag: "Korea" },
  { code: "nld", flag: "Netherlands" },
  { code: "pol", flag: "Poland" },
  { code: "sgp", flag: "Singapore" },
  { code: "swe", flag: "Sweden" },
  { code: "twn", flag: "Taiwan" },
  { code: "usa", flag: "Usa" },
  { code: "zaf", flag: "SouthAfrica" },
];

const getFlagNameFromCountryCode = (countryCode: string): keyof typeof Flags =>
  flagNameCountryCodeMap.find((m) => m.code === countryCode).flag;

export const Flag = ({
  flagName: flagNameProp,
  countryCode,
  size = "small",
  className,
  ...props
}: FlagProps) => {
  const classNames = useMemo(
    () => cx("card", objectToClassNames({ size }), className),
    [className, size],
  );
  const flagName = flagNameProp || getFlagNameFromCountryCode(countryCode);
  const Element = get(Flags, flagName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
