import React from "react";

import styles from "./Badge.module.scss";

export default function Badge(props: {
  message: string;
  type?: "default" | "success" | "warning" | "danger";
  lowercase?: boolean;
}) {
  return (
    <div
      className={`${styles.badge} ${
        props.type ? styles[props.type] : styles.default
      } ${props.lowercase ? styles.lowercase : null}`}
    >
      {props.message}
    </div>
  );
}
