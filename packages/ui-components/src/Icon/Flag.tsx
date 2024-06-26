import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";

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

export type FlagProps = SVGProps<SVGSVGElement> &
  OwnBaseFlagProps &
  (OwnFlagPropsWithFlagName | OwnFlagPropsWithCountryCode);

const cx = classnames.bind(styles);

export const flagNameCountryCodeMap: Array<{
  code: string;
  flag: keyof typeof Flags;
}> = [
  { code: "are", flag: "UnitedArabEmirates" },
  { code: "aus", flag: "Australia" },
  { code: "bel", flag: "Belgium" },
  { code: "bhr", flag: "Bahrain" },
  { code: "bra", flag: "Brazil" },
  { code: "can", flag: "Canada" },
  { code: "chl", flag: "Chile" },
  { code: "che", flag: "Switzerland" },
  { code: "deu", flag: "Germany" },
  { code: "esp", flag: "Spain" },
  { code: "fin", flag: "Finland" },
  { code: "fra", flag: "France" },
  { code: "gbr", flag: "UnitedKingdom" },
  { code: "hkg", flag: "HongKong" },
  { code: "ind", flag: "India" },
  { code: "idn", flag: "Indonesia" },
  { code: "irl", flag: "Ireland" },
  { code: "isr", flag: "Israel" },
  { code: "ita", flag: "Italy" },
  { code: "jpn", flag: "Japan" },
  { code: "kor", flag: "Korea" },
  { code: "nld", flag: "Netherlands" },
  { code: "nor", flag: "Norway" },
  { code: "pol", flag: "Poland" },
  { code: "qat", flag: "Qatar" },
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
  const Element = Flags[flagName];

  if (Element == null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
