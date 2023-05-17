import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography, ThemeProvider } from "@mui/material";
import { theme } from "./style";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Fab from "@mui/material/Fab";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

export default function SimpleBottomNavigation(props) {
  const { filterCmd } = props;
  const [value, setValue] = React.useState(null);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("mobile")]: {
      display: "none",
    },
  }));

  const handleFilter = (data) => {
    // if (value === 0) {
    filterCmd(data);
    // }
  };

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Responsive>
        <Box
          sx={{
            width: winWidth,
            position: "fixed",
            bottom: 0,
            backgroundColor: "#fafafa",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ m: 1, backgroundColor: "white" }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="filter"
                    onClick={() => handleFilter("bottom")}
                  >
                    <TuneRoundedIcon />
                  </Fab>
                  {/* <ColorButton
                    variant="contained"
                    onClick={() => handleFilter("bottom")}
                  >
                    <TuneRoundedIcon />
                  </ColorButton> */}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Responsive>
    </ThemeProvider>
  );
}
