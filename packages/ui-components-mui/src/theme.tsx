import React, { useMemo } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import { type PaletteOptions, useMediaQuery } from "@mui/material";

const crlTheme = createTheme({ 
  components: {
    MuiButtonBase: {
      defaultProps: {
        // Disable the Material Design ripple animation globally.
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // The header is *always* black.
          backgroundColor: "#000",
        },
      },
    },
  },
});

const lightModePalette: PaletteOptions = {
  mode: "light",
};

const darkModePalette: PaletteOptions = {
  mode: "dark",
}

interface ThemeProviderProps {
  children?: React.ReactNode;
}
export default function ThemeProvider(props: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => createTheme(crlTheme, {
    palette: prefersDarkMode ? darkModePalette : lightModePalette,
  }), [ prefersDarkMode ]);
  return <MuiThemeProvider theme={theme}>
    {props.children}
  </MuiThemeProvider>
}
