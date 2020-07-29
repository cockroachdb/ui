import React, { FunctionComponent, ReactNode } from "react";

const Sample: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <div style={{ margin: "0rem 1rem", textAlign: "center" }}>{children}</div>
);

export default Sample;
