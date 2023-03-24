import React, { useState } from "react";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import NavItem from "./NavItem";

export default function NavMenu(props: {label: string, children: JSX.Element[]}) {
  const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const onMenuClose = () => { setAnchorEl(null) };

  return <Box display="inline">
    <NavItem label={props.label + "▼"} onClick={onMenuOpen}/>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      open={anchorEl != null}
      onClose={onMenuClose}>
      {...props.children}
    </Menu>
  </Box>;
}
