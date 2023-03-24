import React from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

export interface NavItemProps {
  label: string;
  onClick?: React.DOMAttributes<HTMLElement>["onClick"];
}

const FocusableNavItem = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: "none",
  color: alpha("#fff", 0.8),
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: alpha("#fff", 0.3),
  }
}));

export default function NavItem(props: NavItemProps) {
  return <FocusableNavItem onClick={props.onClick}>{props.label}</FocusableNavItem>;
}
