import React from "react";
import { storiesOf } from "@storybook/react";

import { DropdownOption, Dropdown } from "./";

storiesOf("Dropdown", module)
  .addDecorator(renderChild => (
    <div style={{ padding: "12px", display: "flex" }}>{renderChild()}</div>
  ))
  .add("Simple", () => {
    const options: DropdownOption[] = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
      { label: "Option 4", value: "option4" },
    ];
    const [selected, setSelected] = React.useState(options[1].value);
    return (
      <Dropdown
        options={options}
        selected={selected}
        onChange={s => setSelected(s.value)}
        title="Simple dropdown component"
      />
    );
  });
