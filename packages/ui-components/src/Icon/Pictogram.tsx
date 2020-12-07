import React, { useMemo } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Pictograms } from "@cockroachlabs/icons";
import styles from "./Pictogram.module.scss";

import objectToClassNames from "../utils/objectToClassnames";

export type PictogramSize = "small" | "medium" | "large";
export type PictogramFill = "default" | "primary";

type OwnPictogramProps = {
  pictogramName: string;
  size?: PictogramSize;
  fill?: PictogramFill;
};

type NativePictogramProps = Omit<
  React.SVGProps<SVGSVGElement>,
  keyof OwnPictogramProps
>;
type PictogramProps = NativePictogramProps & OwnPictogramProps;

const cx = classnames.bind(styles);

export const Pictogram = ({
  pictogramName,
  size = "medium",
  fill = "default",
  className,
  ...props
}: PictogramProps) => {
  const classNames = useMemo(
    () => cx("pictogram", objectToClassNames({ size, fill }), className),
    [className, size, fill],
  );
  const Element = get(Pictograms, pictogramName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
