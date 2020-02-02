import React, { FunctionComponent } from "react";
import { css } from "astroturf";

const styles = css`
  .button {
    color: black;
    border: 1px solid black;
    background-color: white;
  }
`;

const Button: FunctionComponent = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
