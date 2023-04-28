import { createTheme } from "@mui/material";
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
});
