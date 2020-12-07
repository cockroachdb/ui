import React, { FunctionComponent, ReactNode } from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { StoryContainer, StoryDescription, Label } from "../layout";
import {
  Text,
  TextType,
  Heading,
  HeadingType,
  Code,
  CodeWeight,
} from "@cockroachlabs/ui-components";

export default {
  title: "Typography",
  decorators: [withKnobs],
};

const TypeSample: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => (
  <section
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: "2rem",
    }}
  >
    {children}
  </section>
);

const Sample = ({ children }: { children: ReactNode }) => (
  <div style={{ margin: "1rem" }}>{children}</div>
);

const C = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      color: "#333",
      backgroundColor: "#eee",
      padding: "2px",
    }}
  >
    {children}
  </code>
);

const pangram = "The five boxing wizards jump quickly";
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue non turpis vitae tristique. Cras in tellus pretium, dignissim eros vel, luctus ante. Etiam ipsum nisl, sollicitudin ut ornare vel, fringilla et nunc. Pellentesque tincidunt facilisis leo, in sollicitudin massa ornare sed. Curabitur at sem gravida, feugiat justo vitae, euismod arcu. Mauris eu dictum dolor. Quisque consequat odio orci, vitae dignissim elit vestibulum nec. Mauris ut urna elit. Etiam et mi non eros aliquet tempus nec ut tellus. Nunc ut fringilla dui. Curabitur imperdiet, velit vel tempus gravida, tellus velit malesuada nibh, ut lacinia quam nisi eu nibh. Proin sed augue quis libero mollis lobortis vitae eu lectus. Sed ultrices id lacus quis finibus. Etiam vestibulum, mauris et vestibulum elementum, urna ex mattis diam, at tristique lorem orci at felis. Sed ultrices tempus libero.";
const shortLorem = "Lorem ipsum dolor sit amet";
const sample =
  "CREATE TABLE animals (id INT PRIMARY KEY DEFAULT unique_rowid(), name STRING);";
const noWrapSample =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue non turpis vitae tristique. Cras in tellus pretium, dignissim eros";
const headingTypes: Array<HeadingType> = ["h1", "h2", "h3", "h4", "h5", "h6"];
const textTypes: Array<TextType> = [
  "body",
  "body-strong",
  "caption",
  "caption-strong",
  "code",
];
const codeTypes: Array<CodeWeight> = ["regular", "medium", "bold"];

export const HeadingStory = () => (
  <StoryContainer>
    <h1>Heading</h1>

    <StoryDescription>
      The <C>Heading</C> component is used to display heading type treatments in
      Cockroach Labs applications.
    </StoryDescription>

    <section>
      <TypeSample>
        <Sample>
          <Label>Heading 1</Label>
          <Heading type="h1">{pangram}</Heading>
        </Sample>

        <Sample>
          <Label>Heading 2</Label>
          <Heading type="h2">{pangram}</Heading>
        </Sample>

        <Sample>
          <Label>Heading 3</Label>
          <Heading type="h3">{pangram}</Heading>
        </Sample>

        <Sample>
          <Label>Heading 4</Label>
          <Heading type="h4">{pangram}</Heading>
        </Sample>

        <Sample>
          <Label>Heading 5</Label>
          <Heading type="h5">{pangram}</Heading>
        </Sample>

        <Sample>
          <Label>Heading 6</Label>
          <Heading type="h6">{pangram}</Heading>
        </Sample>
      </TypeSample>
    </section>
  </StoryContainer>
);

export const TextStory = () => (
  <StoryContainer>
    <h1>Text</h1>

    <StoryDescription>
      The <C>Text</C> component is used to display copy type treatments in
      Cockroach Labs applications.
    </StoryDescription>

    <section>
      <TypeSample>
        <Sample>
          <Label>Body</Label>
          <Text type="body">{lorem}</Text>
        </Sample>

        <Sample>
          <Label>Body Strong</Label>
          <Text type="body-strong">{lorem}</Text>
        </Sample>

        <Sample>
          <Label>Caption</Label>
          <Text type="caption">{shortLorem}</Text>
        </Sample>

        <Sample>
          <Label>Caption Strong</Label>
          <Text type="caption-strong">{shortLorem}</Text>
        </Sample>
      </TypeSample>
    </section>

    <section>
      <h3>
        <C>noWrap</C> prop
      </h3>
      <StoryDescription>
        In situations when text should be constrained to one line, add the
        <C>noWrap</C> prop. This will constrain text to a single line if the
        parent container has set a width. This works by using the CSS property
        <C>text-overflow: ellipsis</C>
      </StoryDescription>

      <Sample>
        <Label>noWrap false</Label>
        <div style={{ width: "60ch" }}>
          <Text type="body">{lorem}</Text>
        </div>
      </Sample>

      <Sample>
        <Label>noWrap true</Label>
        <div style={{ width: "60ch" }}>
          <Text type="body" noWrap={true}>
            {lorem}
          </Text>
        </div>
      </Sample>
    </section>
  </StoryContainer>
);

export const CodeStory = () => (
  <StoryContainer>
    <h1>Code</h1>

    <StoryDescription>
      The `Code` component is used to display code samples or technical text
      treatments in Cockroach Labs applications.
    </StoryDescription>

    <section>
      <TypeSample>
        <Sample>
          <Label>Code Regular</Label>
          <Code weight="regular">{sample}</Code>
        </Sample>

        <Sample>
          <Label>Code Medium</Label>
          <Code weight="medium">{sample}</Code>
        </Sample>

        <Sample>
          <Label>Code Bold</Label>
          <Code weight="bold">{sample}</Code>
        </Sample>
      </TypeSample>
    </section>
  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <h1>Demo</h1>
    <section>
      <h3>Heading</h3>
      <div>
        <Heading type={select("Heading Type", headingTypes, "h1")}>
          {text("Heading Text", pangram)}
        </Heading>
      </div>
    </section>
    <section>
      <h3>Text</h3>
      <div>
        <Text type={select("Text Type", textTypes, "body")}>
          {text("Text", lorem)}
        </Text>
      </div>
    </section>
    <section>
      <h3>Code</h3>
      <div>
        <Code weight={select("Code Weight", codeTypes, "regular")}>
          {text("Code Text", sample)}
        </Code>
      </div>
    </section>
  </StoryContainer>
);
