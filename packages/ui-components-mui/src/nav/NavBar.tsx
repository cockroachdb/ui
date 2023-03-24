import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

import NavMenu from "./NavMenu";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";

interface Org {
  name: string;
  id: string;
}

interface User {
  name: string;
}

export interface NavbarProps {
  orgs: Org[];
  currentOrg: string;
  user: User;
  children?: JSX.Element[];
}

export default function NavBar(props: NavbarProps) {
  const orgMenu = props.orgs.length
    ? <NavMenu label={props.currentOrg}>
        {...props.orgs.map((o) => <MenuItem>{o.name}</MenuItem>)}
      </NavMenu>
    : null;
  const user = <IconButton sx={{p: 0}}>
    <Avatar alt={props.user.name}>{props.user.name.charAt(0)}</Avatar>
  </IconButton>;
  let orgAndUser: JSX.Element[] = [];
  if (orgMenu) {
    orgAndUser = [
      orgMenu,
      <Divider orientation="vertical" flexItem variant="middle" sx={{borderColor: "#fff"}}/>,
      user,
    ];
  } else {
    orgAndUser = [ user ];
  }
  
  return <AppBar position="sticky">
    <Toolbar>
      <Typography>
        (LOGO GOES HERE)
      </Typography>
      <List sx={{flexGrow: 1}}>
        {...props.children ?? []}
      </List>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        gap: "0.5rem",
      }}>
        {...orgAndUser}
      </Box>
    </Toolbar>
    <Divider sx={{borderColor: alpha("#fff", 0.7), borderBottomThickness: "3px"}}/>
  </AppBar>
}
