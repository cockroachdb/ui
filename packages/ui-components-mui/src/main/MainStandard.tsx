import React from "react";

import Container  from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box, { type BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface MainStandardProps {
  children: JSX.Element | JSX.Element[],
  title: string,
}

const Background = styled(Box)<BoxProps>(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: -1,
  height: "20rem",
  width: "100%",
  backgroundColor: "black",
}));

export default function MainStandard(props: MainStandardProps) {
  return <>
    <Background/>
    <Container>
      <Typography variant="h1" sx={{color: "white"}}>{props.title}</Typography>
      <Paper elevation={2} sx={{borderRadius: "8px"}}>
        {...(Array.isArray(props.children) ? props.children : [props.children])}
      </Paper>
    </Container>
  </>;
}
