import React, { useEffect, useState } from "react";
import styles from "./ExpandableText.module.scss";
import classNames from "classnames/bind";
import LinesEllipsis from "react-lines-ellipsis";

interface ExpandableTextProps {
  text: string;
  maxLine: number;
}

const cx = classNames.bind(styles);

export function ExpandableText({
  text,
  maxLine,
}: ExpandableTextProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // When the text changes, reset to the default of isExpanded=false.
    // This is needed in case the text changes without re-mounting the component.
    setIsExpanded(false);
  }, [text]);

  return (
    <>
      {!isExpanded && (
        <LinesEllipsis
          text={text}
          maxLine={maxLine}
          /**
           * The type definition for the ellipsis prop (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-lines-ellipsis/index.d.ts#L14)
           * does not match the component behavior or the docs (https://github.com/xiaody/react-lines-ellipsis#propsellipsis-node),
           * which says that ellipsis takes type Node.
           */
          ellipsis={
            (
              <>
                {"… "}
                <a
                  className={cx("crl-anchor")}
                  onClick={() => {
                    setIsExpanded(true);
                  }}
                >
                  Show More
                </a>
              </>
            ) as unknown as string
          }
        />
      )}
      {isExpanded && (
        <div>
          {text}{" "}
          <a className={cx("anchor")} onClick={() => setIsExpanded(false)}>
            Show Less
          </a>
        </div>
      )}
    </>
  );
}

export default ExpandableText;
