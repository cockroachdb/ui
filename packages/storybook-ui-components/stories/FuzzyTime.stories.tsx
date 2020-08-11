import React, { FunctionComponent, ReactNode } from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { FuzzyTime } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription, Label, Sample } from "../layout";

export default {
  title: "FuzzyTime",
  components: FuzzyTime,
  decorators: [withKnobs],
};

// timestamp samples
const aFewSecondsAgo = new Date(Date.now() - 3000);
const aCoupleMinutesAgo = new Date(Date.now() - 1000 * 60 * 2);
const someHoursAgo = new Date(Date.now() - 1000 * 60 * 60 * 6);
const manyDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 17);
const monthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 5);
const now = new Date();
const theFuture = new Date(Date.now() + 31104000000);

const FuzzySample: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => (
  <section
    style={{
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "2rem",
    }}
  >
    {children}
  </section>
);

export const Example = () => (
  <StoryContainer>
    <h1>FuzzyTime</h1>

    <StoryDescription>
      Fuzzy time takes a date string as a prop and renders and human readable
      time difference
    </StoryDescription>

    <section>
      <h3>TimeStamp</h3>
      <FuzzySample>
        <Sample>
          <Label>
            {`${aFewSecondsAgo.toDateString()}
              ${aFewSecondsAgo.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={aFewSecondsAgo} />
        </Sample>
        <Sample>
          <Label>
            {`${aCoupleMinutesAgo.toDateString()}
              ${aCoupleMinutesAgo.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={aCoupleMinutesAgo} />
        </Sample>
        <Sample>
          <Label>
            {`${someHoursAgo.toDateString()}
              ${someHoursAgo.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={someHoursAgo} />
        </Sample>
        <Sample>
          <Label>
            {`${manyDaysAgo.toDateString()}
              ${manyDaysAgo.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={manyDaysAgo} />
        </Sample>
        <Sample>
          <Label>
            {`${monthsAgo.toDateString()}
              ${monthsAgo.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={monthsAgo} />
        </Sample>
      </FuzzySample>
      <FuzzySample>
        <Sample>
          <Label>
            {`${now.toDateString()}
              ${now.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={now} />
        </Sample>
        <Sample>
          <Label>
            {`${theFuture.toDateString()}
              ${theFuture.toLocaleTimeString()}`}
          </Label>
          <FuzzyTime timestamp={theFuture} />
        </Sample>
      </FuzzySample>
    </section>
  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <FuzzyTime timestamp={text("Timestamp", "15 MAR 2020 00:00:00")} />
  </StoryContainer>
);
