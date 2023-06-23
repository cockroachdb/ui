import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Illustrations } from "@cockroachlabs/icons";
import styles from "./Illustration.module.scss";

type OwnIllustrationProps = {
  illustrationName: keyof typeof Illustrations;
};

export type IllustrationProps = SVGProps<SVGAElement> & OwnIllustrationProps;

const cx = classnames.bind(styles);

export const Illustration = ({
  illustrationName,
  className,
  ...props
}: IllustrationProps) => {
  const classNames = useMemo(() => cx("illustration", className), [className]);

  const Element = get(Illustrations, illustrationName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
