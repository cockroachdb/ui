import React, { FunctionComponent, ReactNode } from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Button, ButtonIntent, ButtonSize, Icon} from "@cockroachlabs/ui-components";
import { StoryContainer } from "../layout";

export default {
  title: "Button",
  components: Button,
  decorators: [withKnobs],
};

const ButtonDisplaySection: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => (
  <section style={{ display: "flex", justifyContent: "flex-start" }}>
    {children}
  </section>
);
const ButtonDisplay: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <div style={{ margin: "0rem 1rem", textAlign: "left" }}>{children}</div>
);
const Label: FunctionComponent<{ children: string }> = ({ children }) => (
  <div style={{ marginBottom: "1rem" }}>
    <code>{children}</code>
  </div>
);

const Link: FunctionComponent<{ children: ReactNode }> = props => (
  <div data-test="fake-link">{props.children}</div>
);

export const Example = () => (
  <StoryContainer>
    <p>
      {" "}
      Buttons allow users to perform an action or to navigate to another page.
      They have multiple styles for various needs, and are ideal for calling
      attention to where a user needs to do something in order to move forward
      in a flow.
    </p>

    <h1>Type</h1>
    <hr></hr>
    <section style={{ maxWidth: "700px" }}>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button intent="primary">Primary</Button>
          <p
            style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}
          >
            Use a primary button to highlight the strongest call to action on a page. They are meant to look heavy in order to direct the user’s attention to the primary action on a page.
          </p>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button>Secondary</Button>
          <p
            style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}
          >
            Use for actions that complement a primary action, or when there are
            multiple actions of equal weight.
          </p>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button intent="tertiary">Tertiary</Button>
          <p
            style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}
          >
            Use as an alternative to the secondary button for complementary
            actions. They can be used inline because they are different from
            content in style and recognizable as buttons alongside content.
          </p>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button intent="danger">Danger</Button>
          <p
            style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}
          >
            Use a danger button for destructive actions like deleting. They indicate high severity and are meant to stand out so a user will proceed with caution.
          {" "}
          </p>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button as={Link}>Link</Button>
          <p
            style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}
          >
            Use to open an external URL. Potentially used with the OpenWindow Icon. This same link style can be used to perform a less prominent action in the application, or an action within a sentence of instructions.{" "}
          </p>
        </ButtonDisplay>
      </ButtonDisplaySection>
    </section>

    <section>
      <h3>States</h3>
      <hr></hr>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <p>Primary</p>
          <Button intent="primary">Primary</Button>
          <Button intent="primary" style={{marginLeft: "12px"}}>Active</Button>
          <Button intent="primary" style={{marginLeft: "12px"}}>Hover</Button>
          <Button intent="primary" style={{marginLeft: "12px"}}>Focus</Button>
          <Button intent="primary" disabled style={{marginLeft: "12px"}}>Disabled</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <p>Secondary</p>
          <Button intent="secondary">Primary</Button>
          <Button intent="secondary" style={{marginLeft: "12px"}}>Active</Button>
          <Button intent="secondary" style={{marginLeft: "12px"}}>Hover</Button>
          <Button intent="secondary" style={{marginLeft: "12px"}}>Focus</Button>
          <Button intent="secondary" disabled style={{marginLeft: "12px"}}>Disabled</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <p>Tertiary</p>
          <Button intent="tertiary">Primary</Button>
          <Button intent="tertiary" style={{marginLeft: "12px"}}>Active</Button>
          <Button intent="tertiary" style={{marginLeft: "12px"}}>Hover</Button>
          <Button intent="tertiary" style={{marginLeft: "12px"}}>Focus</Button>
          <Button intent="tertiary" disabled style={{marginLeft: "12px"}}>Disabled</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <br></br>
      <br></br>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <p>Danger</p>
          <Button intent="danger">Primary</Button>
          <Button intent="danger" style={{marginLeft: "12px"}}>Active</Button>
          <Button intent="danger" style={{marginLeft: "12px"}}>Hover</Button>
          <Button intent="danger" style={{marginLeft: "12px"}}>Focus</Button>
          <Button intent="danger" disabled style={{marginLeft: "12px"}}>Disabled</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
    </section>
    
    <section>
      <h3>Formatting</h3>
      <hr></hr>
      <p>Anatomy</p>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button>Text only</Button>
          <Button style={{marginLeft: "12px"}}>With Icon Left</Button>
          <Button style={{marginLeft: "12px"}}>With Icon Right</Button>
          <Button style={{marginLeft: "12px"}}>Icon Only</Button>
          <p
          style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}>
            <b>Text only:</b> Use Text only to clearly describe the action.
            <br></br>
            <b>Text + Icon:</b>Use an Icon with Text to convey more meaning. Icon can be left or right aligned. 
            <br></br>
            <b>Icon only:</b>Use Icon only sparingly, to save space. Never as the primary action. The icon should be easily understood.
          </p>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <p>Size</p>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Button intent="primary">Standard</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Button intent="primary" size="small">Small</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
      <p
          style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}>
            <b>Default:</b> Use as the default button size when there is enough space.
            <br></br>
            <b>Small:</b>Use small to conserve space or when using button groups (eg. in table rows). 
            <br></br>
          </p>
      <p>Alignment</p>
      <ButtonDisplaySection>
      <ButtonDisplay>
          <Button intent="primary">Fixed</Button>
        </ButtonDisplay>
        <div
          style={{ textAlign: "center", width: "300px" }}
        >
          <Button fluid intent="primary">Fluid</Button>
        </div>
      </ButtonDisplaySection>
      <p
          style={{ textAlign: "left", lineHeight: "24px", fontSize: "16px" }}>
            <b>Fixed:</b> Fixed buttons are constricted to the size of their contents (eg. text or icons).
            <br></br>
            <b>Fluid:</b>Fluid buttons can take the width of their container. 
            <br></br>
          </p>
    </section>
    <section>
      <h3>Spacing</h3>
      <hr></hr>
      <p>Rules about when to use 16px padding button, vs. 24px padding button. Make padding part of button component. </p>
      </section>
    <section>
    {/* <h3>Disabled</h3>
      <hr></hr>
      <ButtonDisplaySection>
        <ButtonDisplay> 
          <Label>primary</Label>
          <Button intent="primary" disabled>
            Primary
          </Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>success</Label>
          <Button intent="success" disabled>
            Success
          </Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>danger</Label>
          <Button intent="danger" disabled>
            Danger
          </Button> 
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>secondary (default)</Label>
          <Button disabled>Secondary</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>tertiary</Label>
          <Button intent="tertiary" disabled>
            Tertiary
          </Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
      */}
      <h3>Button Elements</h3>
      <hr></hr>
      <ButtonDisplaySection>
      <ButtonDisplay>
          <Label>
            Links
            as default (`button`) with type submit wrapped in a `form`
          </Label>
          <form
            onSubmit={e => {
              e.preventDefault();
              alert("submit!");
            }}
          >
            <Button type="submit">Submit</Button>
          </form>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>as `a` tag with `href` value</Label>
          <Button as="a" href="https://cockroachlabs.com">
            cockroachlabs.com
          </Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>as `div`</Label>
          <Button as="div">Just a div</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>as `Link`</Label>
          <Button as={Link}>this is a link</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
    </section>
  </StoryContainer>
);

export const Demo = () => {
  const intents: Array<ButtonIntent> = [
    "primary",
    "danger",
    "secondary",
    "tertiary",
  ];
  const sizes: Array<ButtonSize> = ["standard", "small"];
  return (
    <StoryContainer>
      <Button
        intent={select("Intent", intents, "primary")}
        size={select("Size", sizes, "standard")}
      >
        {text("Text", "button")}
      </Button>
    </StoryContainer>
  );
};
