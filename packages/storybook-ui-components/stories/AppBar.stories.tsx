import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import MenuItem from "@mui/material/MenuItem";
import { NavBar, NavItem, NavMenu } from "@cockroachlabs/ui-components-mui";

export default {
  title: "Navigation Bar",
  component: NavBar,
  argTypes: {
    currentOrg: {
      description: "Name of the currently-selected org",
      type: "string",
    },
  },
} as ComponentMeta<typeof NavBar>;

export const Basic: ComponentStory<typeof NavBar> = ({currentOrg, user}) => {
  const orgs = [
    {name: "MovR", id: "111-222-333",},
    {name: "HoovR", id: "123-123-123", },
    {name: "Miele", id: "vacuum", },
  ];
  return <NavBar
    currentOrg={currentOrg}
    orgs={orgs}
    user={user}
  >
    <NavItem label="Clusters"/>
    <NavItem label="Billing"/>
    <NavItem label="Alerts"/>
    <NavItem label="Alerts"/>
    <NavMenu label="Organization">
      <MenuItem>Lorem</MenuItem>
      <MenuItem>Ipsum</MenuItem>
      <MenuItem>Dolor</MenuItem>
    </NavMenu>
  </NavBar>
};

Basic.args = {
  currentOrg: "MovR",
  user: {
    name: "Jeremy",
  },
};
