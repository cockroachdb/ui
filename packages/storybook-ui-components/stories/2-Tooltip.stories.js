import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Tooltip } from "@cockroachlabs/ui-components";

export default {
  title: "Tooltip",
  components: Tooltip,
  decorators: [withKnobs],
};

export const Example = () => {
  const text = <span>Tooltip Text</span>;

  const styles = {
    display: "table-cell",
    height: "60px",
    width: "80px",
    textAlign: "center",
    background: "#f6f6f6",
    verticalAlign: "middle",
    border: "5px solid white",
  };

  const rowStyle = {
    display: "table-row",
  };
  
  return (
    <section>
      <h1>Tooltip</h1>
      <section>
        <h3>Positions</h3>
        <div style={{ display: "table", margin: "0 auto" }}>
          <div style={rowStyle}>
            <Tooltip position="left" content={text}>
              <div style={styles}>Left</div>
            </Tooltip>
            <Tooltip position="top" content={text}>
              <div style={styles}>Top</div>
            </Tooltip>
            <Tooltip position="bottom" content={text}>
              <div style={styles}>Bottom</div>
            </Tooltip>
            <Tooltip position="right" content={text}>
              <div style={styles}>Right</div>
            </Tooltip>
          </div>
          <div style={rowStyle}>
            <Tooltip position="leftTop" content={text}>
              <div style={styles}>Left Top</div>
            </Tooltip>
            <Tooltip position="leftBottom" content={text}>
              <div style={styles}>Left Bottom</div>
            </Tooltip>
            <Tooltip position="rightTop" content={text}>
              <div style={styles}>Right Top</div>
            </Tooltip>
            <Tooltip position="rightBottom" content={text}>
              <div style={styles}>Right Bottom</div>
            </Tooltip>
          </div>
          <div style={rowStyle}>
            <Tooltip position="topLeft" content={text}>
              <div style={styles}>Top Left</div>
            </Tooltip>
            <Tooltip position="topRight" content={text}>
              <div style={styles}>Top Right</div>
            </Tooltip>
            <Tooltip position="bottomLeft" content={text}>
              <div style={styles}>Bottom Left</div>
            </Tooltip>
            <Tooltip position="bottomRight" content={text}>
              <div style={styles}>Bottom Right</div>
            </Tooltip>
          </div>
        </div>
      </section>
      <section>
        <h3>STYLES</h3>

        <div style={{ display: "table", margin: "0 auto 100px auto" }}>
          <div style={{ display: "table-row"}}>
            <Tooltip
              position="bottom"
              style="default"
              visible={true}
              content={text}
            >
              <div style={{...styles, width: "110px",}}>default</div>
            </Tooltip>
            <Tooltip
              position="bottom"
              style="dark"
              visible={true}
              content={text}
            >
              <div style={{...styles, width: "110px",}}>dark</div>
            </Tooltip>
            <Tooltip
              position="bottom"
              style="light"
              visible={true}
              content={text}
            >
              <div style={{...styles, width: "110px",}}>light</div>
            </Tooltip>
          </div>
        </div>
      </section>
    </section>
  );
};

export const Demo = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 300,
    }}
  >
    <Tooltip
      position={select(
        "Position",
        [
          "left",
          "right",
          "top",
          "bottom",
          "topLeft",
          "topRight",
          "bottomLeft",
          "bottomRight",
        ],
        "bottom"
      )}
      style={select("Style", ["default", "dark", "light"], "default")}
      content={text(
        "Text",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      )}
    >
      hover me
    </Tooltip>
  </div>
);
