import React from "react";
import Button from "@mui/material/Button";

export interface NavItemProps {
  label: string;
  onClick?: React.DOMAttributes<HTMLElement>["onClick"];
}
export default function NavItem(props: NavItemProps) {
    return <Button onClick={props.onClick} sx={{color: "#fff" }}>{props.label}</Button>;
}
