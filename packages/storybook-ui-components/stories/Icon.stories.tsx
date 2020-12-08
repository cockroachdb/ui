import React, { FunctionComponent, ReactElement } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { StoryContainer, StoryDescription } from "../layout";

import {
  SystemIcons as IconSet,
  Pictograms as PictogramSet,
  ThirdParty as ThirdPartySet,
} from "@cockroachlabs/icons";
import {
  Icon,
  IconSize,
  IconFill,
  Pictogram,
  PictogramSize,
  PictogramFill,
  ThirdPartyIcon,
  ThirdPartySize,
} from "@cockroachlabs/ui-components";

export default {
  title: "Icons",
  component: Icon,
  decorators: [withKnobs],
};

const IconDisplaySection: FunctionComponent<{
  children: Array<ReactElement | null>;
}> = ({ children }) => (
  <section
    style={{
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "row wrap",
    }}
  >
    {children}
  </section>
);

const IconDisplay: FunctionComponent<{
  children: Array<ReactElement | null>;
  backgroundColor?: string;
}> = ({ children, backgroundColor = "transparent" }) => (
  <div
    style={{
      textAlign: "center",
      backgroundColor: backgroundColor,
      margin: "2rem 1rem",
    }}
  >
    {children}
  </div>
);
const IconFrame: FunctionComponent<{
  children: ReactElement;
}> = ({ children }) => (
  <div
    style={{ display: "flex", height: "75px", width: "75px", margin: "auto" }}
  >
    {children}
  </div>
);

const IconLabel: FunctionComponent<{
  text: string;
}> = ({ text }) => (
  <code style={{ fontFamily: "monospace", fontSize: "12px" }}>{text}</code>
);

const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];
const IconNames: Array<keyof typeof IconSet> = keys(IconSet);

const sizes: Array<{ key: IconSize; size: number }> = [
  { key: "small", size: 16 },
  { key: "default", size: 24 },
  { key: "medium", size: 32 },
  { key: "large", size: 48 },
  { key: "x-large", size: 56 },
];
const fills: Array<IconFill> = [
  "danger",
  "default",
  "info",
  "primary",
  "success",
  "warning",
  "inverted",
  "disabled",
  "disabled-light",
];

export const SystemIcons = () => (
  <StoryContainer>
    <h1>Icons</h1>

    <section>
      <h2>Icon Names</h2>
      <IconDisplaySection>
        {IconNames.map(name => (
          <IconDisplay key={name}>
            <IconLabel text={name} />
            <IconFrame>
              <Icon iconName={name} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Icon Sizes</h2>
      <IconDisplaySection>
        {sizes.map(s => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame>
              <Icon iconName="PlusCircle" size={s.key} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Icon Fills</h2>
      <IconDisplaySection>
        {fills.map(fill => {
          return (
            <IconDisplay
              key={fill}
              backgroundColor={fill === "inverted" ? "#c0c6d9" : ""}
            >
              <IconLabel text={fill} />
              <IconFrame>
                <Icon iconName="Plus" fill={fill} />
              </IconFrame>
            </IconDisplay>
          );
        })}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

const pictogramNames: Array<keyof typeof PictogramSet> = keys(PictogramSet);
const pictogramSizes: Array<{ key: PictogramSize; size: number }> = [
  { key: "small", size: 40 },
  { key: "medium", size: 48 },
  { key: "large", size: 56 },
];
const pictogramFills: Array<PictogramFill> = ["default", "primary"];

export const Pictograms = () => (
  <StoryContainer>
    <h1>Pictograms</h1>

    <section>
      <h3>Pictogram Names</h3>
      <IconDisplaySection>
        {pictogramNames.map(name => (
          <IconDisplay key={name}>
            <IconLabel text={name} />
            <IconFrame>
              <Pictogram pictogramName={name} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Pictogram Sizes</h2>
      <IconDisplaySection>
        {pictogramSizes.map(s => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame>
              <Pictogram pictogramName="Add" size={s.key} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Pictogram Fills</h2>
      <IconDisplaySection>
        {pictogramFills.map(fill => (
          <IconDisplay key={fill}>
            <IconLabel text={fill} />
            <IconFrame>
              <Pictogram pictogramName="Monitoring" fill={fill} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

const thirdPartyIconNames: Array<keyof typeof ThirdPartySet> = keys(
  ThirdPartySet,
);
const thirdPartySizes: Array<{ key: ThirdPartySize; size: number }> = [
  { key: "tiny", size: 16 },
  { key: "small", size: 24 },
  { key: "medium", size: 32 },
  { key: "large", size: 48 },
  { key: "x-large", size: 56 },
];
export const ThirdPartyIcons = () => (
  <StoryContainer>
    <h1>Third Party Icons</h1>

    <IconDisplaySection>
      {thirdPartyIconNames.map(name => (
        <IconDisplay key={name}>
          <IconLabel text={name} />
          <IconFrame>
            <ThirdPartyIcon iconName={name} />
          </IconFrame>
        </IconDisplay>
      ))}
    </IconDisplaySection>

    <section>
      <h2>Third Party Icon Sizes</h2>
      <IconDisplaySection>
        {thirdPartySizes.map(s => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame>
              <ThirdPartyIcon iconName="Gcp" size={s.key} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <Icon
      iconName={select("Icon Name", IconNames, "Plus")}
      size={select(
        "Size",
        sizes.map(s => s.key),
        "default",
      )}
      fill={select("Fill", fills, "default")}
    />
  </StoryContainer>
);
