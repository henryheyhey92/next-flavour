import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';
import React from "react";

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 573,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: red[600],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
