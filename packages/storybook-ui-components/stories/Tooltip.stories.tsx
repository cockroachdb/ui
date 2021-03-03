import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Tooltip } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription } from "../layout";

export default {
  title: "Tooltip",
  components: Tooltip,
  decorators: [withKnobs],
};

export const Example = () => {
  const text = (
    <span>
      reasonable tooltip text,
      <br />
      some more text
    </span>
  );

  const styles: React.CSSProperties = {
    display: "table-cell",
    height: "80px",
    width: "80px",
    textAlign: "center",
    background: "#f6f6f6",
    verticalAlign: "middle",
    border: "5px solid white",
    boxSizing: "border-box",
  };

  const rowStyle: React.CSSProperties = {
    display: "table-row",
  };

  return (
    <StoryContainer>
      <h1>Tooltips</h1>

      <StoryDescription>
        Use tooltips to identify or add a small amount of information to an
        element. Tooltips can be used to help users understand the meaning of
        terminology used in the UI, show the full version of truncated text, or
        help users understand the meaning of icons.
        <p>
          The position of tooltips is flexible and will change depending on how
          close the element is to the edge of the screen. Tooltip text wraps
          when the content is wider than the max-width.
        </p>
      </StoryDescription>
      <section>
        <h1>Positions</h1>
        <div style={{ display: "table", margin: "0 auto" }}>
          <div style={rowStyle}>
            <Tooltip placement="left" content={text}>
              <div style={styles}>Left</div>
            </Tooltip>
            <Tooltip placement="top" content={text}>
              <div style={styles}>Top</div>
            </Tooltip>
            <Tooltip placement="bottom" content={text}>
              <div style={styles}>Bottom</div>
            </Tooltip>
            <Tooltip placement="right" content={text}>
              <div style={styles}>Right</div>
            </Tooltip>
          </div>
          <div style={rowStyle}>
            <Tooltip placement="top-start" content={text}>
              <div style={styles}>Top start</div>
            </Tooltip>
            <Tooltip placement="top-end" content={text}>
              <div style={styles}>Top end</div>
            </Tooltip>
            <Tooltip placement="right-start" content={text}>
              <div style={styles}>Right start</div>
            </Tooltip>
            <Tooltip placement="right-end" content={text}>
              <div style={styles}>Right end</div>
            </Tooltip>
          </div>
          <div style={rowStyle}>
            <Tooltip placement="left-start" content={text}>
              <div style={styles}>Left start</div>
            </Tooltip>
            <Tooltip placement="left-end" content={text}>
              <div style={styles}>Left end</div>
            </Tooltip>
            <Tooltip placement="bottom-start" content={text}>
              <div style={styles}>Bottom start</div>
            </Tooltip>
            <Tooltip placement="bottom-end" content={text}>
              <div style={styles}>Bottom end</div>
            </Tooltip>
          </div>
        </div>

        <section>
          <h3>Styles</h3>

          <div style={{ display: "table", margin: "0 auto 100px auto" }}>
            <div style={{ display: "table-row" }}>
              <Tooltip
                placement="bottom"
                style="default"
                visible={true}
                content={text}
              >
                <div style={{ ...styles, width: "200px" }}>default</div>
              </Tooltip>
              <Tooltip
                placement="bottom"
                style="dark"
                visible={true}
                content={text}
              >
                <div style={{ ...styles, width: "200px" }}>dark</div>
              </Tooltip>
              <Tooltip
                placement="bottom"
                style="light"
                visible={true}
                content={text}
              >
                <div style={{ ...styles, width: "200px" }}>light</div>
              </Tooltip>
            </div>
          </div>
        </section>
      </section>
    </StoryContainer>
  );
};

export const Demo = () => (
  <StoryContainer>
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
        placement={select(
          "Position",
          [
            "left",
            "left-start",
            "left-end",
            "right",
            "right-start",
            "right-end",
            "top",
            "top-start",
            "top-end",
            "bottom",
            "bottom-start",
            "bottom-end",
          ],
          "bottom",
        )}
        style={select("Style", ["default", "dark", "light"], "default")}
        content={text(
          "Text",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        )}
      >
        hover me
      </Tooltip>
    </div>
  </StoryContainer>
);
