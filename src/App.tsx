import React from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import RouteWrapper from "./routes/RouteWrapper";
import "./App.css";
import { Home } from "./pages";

let theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Poppins, serif",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            textTransform: "initial",
          },
          "*::before, *::after": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
          },
          "a, li, ul": {
            listStyleType: "none",
            textDecoration: "none",
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 992,
        lg: 1200,
        xl: 1400,
      },
    },
  })
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <Box component={"header"}>
          <Home/>
        </Box>
        {/* YOUR ROUTES HERE */}
        <RouteWrapper />
      </Box>
    </ThemeProvider>
  );
}

export default App;
