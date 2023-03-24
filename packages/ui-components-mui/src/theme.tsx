import React, { useMemo } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const crlTheme = createTheme({ 
  components: {
    MuiButtonBase: {
      defaultProps: {
        // Disable the Material Design ripple animation globally
        disableRipple: true,
      }
    }
  }

});

interface ThemeProviderProps {
  children?: React.ReactNode;
}
export default function ThemeProvider(props: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => createTheme(crlTheme, {
    palette: { 
      mode: prefersDarkMode ? "dark" : "light"
    }
  }), [ prefersDarkMode ]);
  return <MuiThemeProvider theme={theme}>
    {props.children}
  </MuiThemeProvider>
}
