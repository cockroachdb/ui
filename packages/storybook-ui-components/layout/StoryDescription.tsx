import React, { FunctionComponent } from "react";

const StoryDescription: FunctionComponent = ({ children }) => (
  <div
    style={{
      margin: "2rem 0",
      fontSize: "14px",
      color: "#475872",
      maxWidth: "600px",
      lineHeight: "24px",
    }}
  >
    {children}
  </div>
);

export default StoryDescription;
