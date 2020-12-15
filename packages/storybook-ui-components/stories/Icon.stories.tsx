import React, { FunctionComponent, ReactNode, CSSProperties } from "react";
import { StoryContainer, StoryDescription } from "../layout";

import {
  SystemIcons as IconSet,
  Pictograms as PictogramSet,
  ThirdParty as ThirdPartySet,
  Cards as CreditCardSet,
  Flags as FlagSet,
  Illustrations as IllustrationSet,
} from "@cockroachlabs/icons";
import {
  Icon,
  IconSize,
  IconFill,
  Illustration,
  Pictogram,
  PictogramSize,
  PictogramFill,
  ThirdPartyIcon,
  ThirdPartySize,
  CreditCard,
  CreditCardSize,
  Flag,
  FlagSize,
  flagNameCountryCodeMap,
} from "@cockroachlabs/ui-components";

export default {
  title: "Icons",
  component: Icon,
};

const IconDisplaySection = ({ children }: { children: ReactNode }) => (
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

const IconDisplay = ({
  children,
  backgroundColor = "transparent",
}: {
  children: ReactNode;
  backgroundColor?: string;
}) => (
  <div
    style={{
      textAlign: "center",
      backgroundColor: backgroundColor,
      margin: "2rem 1.5rem",
      padding: "0 0.5rem",
      minWidth: "300px",
    }}
  >
    {children}
  </div>
);
const IconFrame = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: "flex", height: "75px", width: "75px", margin: "auto" }}
  >
    {children}
  </div>
);
const IllustrationFrame = ({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}) => <div style={{ margin: "1rem", ...style }}>{children}</div>;

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

const creditCardNames: Array<keyof typeof CreditCardSet> = keys(CreditCardSet);
const creditCardSizes: Array<{ key: CreditCardSize; size: number }> = [
  { key: "tiny", size: 16 },
  { key: "small", size: 24 },
  { key: "medium", size: 28 },
  { key: "large", size: 32 },
];
export const CreditCards = () => (
  <StoryContainer>
    <h1>Credit Card Icons</h1>

    <IconDisplaySection>
      {creditCardNames.map(name => (
        <IconDisplay key={name}>
          <IconLabel text={name} />
          <IconFrame>
            <CreditCard creditCardName={name} />
          </IconFrame>
        </IconDisplay>
      ))}
    </IconDisplaySection>

    <section>
      <h2>Credit Card Icon Sizes</h2>
      <IconDisplaySection>
        {creditCardSizes.map(s => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame>
              <CreditCard creditCardName="Visa" size={s.key} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

const flagNames: Array<keyof typeof FlagSet> = keys(FlagSet);
const flagSizes: Array<{ key: FlagSize; size: number }> = [
  { key: "tiny", size: 16 },
  { key: "small", size: 24 },
  { key: "medium", size: 28 },
  { key: "large", size: 32 },
];
const countryCodes = flagNameCountryCodeMap.map(f => f.code);

export const Flags = () => (
  <StoryContainer>
    <h1>Flags</h1>

    <IconDisplaySection>
      {flagNames.map(name => (
        <IconDisplay key={name} backgroundColor="hsl(0, 0%, 97%)">
          <IconLabel text={name} />
          <IconFrame>
            <Flag flagName={name} />
          </IconFrame>
        </IconDisplay>
      ))}
    </IconDisplaySection>

    <section>
      <h2>Flags by Country Code</h2>

      <StoryDescription>
        Flags can also be rendered by passing a <code>countryCode</code> prop
        instead of a <code>flagName</code>
      </StoryDescription>

      <IconDisplaySection>
        {countryCodes.map(code => (
          <IconDisplay key={code} backgroundColor="hsl(0, 0%, 97%)">
            <IconLabel text={code} />
            <IconFrame>
              <Flag countryCode={code} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Flag Sizes</h2>
      <IconDisplaySection>
        {flagSizes.map(s => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame>
              <Flag flagName="Usa" size={s.key} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

const illustrationNames = keys(IllustrationSet);

export const Illustrations = () => (
  <StoryContainer>
    <h1>Illustrations</h1>

    <IconDisplaySection>
      {illustrationNames.map(name => (
        <IconDisplay key={name}>
          <IconLabel text={name} />
          <IllustrationFrame>
            <Illustration illustrationName={name} />
          </IllustrationFrame>
        </IconDisplay>
      ))}
    </IconDisplaySection>

    <h2>Flexible Sizes</h2>
    <StoryDescription>
      Illustrations are intented to be displayed in their full resolution (
      <code>152x240</code>) but if their container is smaller than that they
      will shrink rather that overflowing
    </StoryDescription>
    <IconDisplaySection>
      <IconDisplay>
        <IconLabel text="Normal" />
        <IllustrationFrame>
          <Illustration illustrationName="Nodes" />
        </IllustrationFrame>
      </IconDisplay>

      <IconDisplay>
        <IconLabel text="Smaller" />
        <IllustrationFrame style={{ margin: "1rem auto", width: "150px" }}>
          <Illustration illustrationName="Nodes" />
        </IllustrationFrame>
      </IconDisplay>

      <IconDisplay>
        <IconLabel text="Smallest" />
        <IllustrationFrame style={{ margin: "1rem auto", width: "100px" }}>
          <Illustration illustrationName="Nodes" />
        </IllustrationFrame>
      </IconDisplay>
    </IconDisplaySection>
  </StoryContainer>
);
