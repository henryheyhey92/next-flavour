import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, ThemeProvider } from "@mui/material";
import { theme } from "./style";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

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
        <Box sx={{ width: winWidth, position: "fixed", bottom: 0 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <Box>
              <TextField
                sx={{ m: 1 }}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ColorButton
                        variant="contained"
                        onClick={() => handleFilter("bottom")}
                      >
                        Filter
                      </ColorButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* <Stack spacing={2} direction="row">
              <ColorButton
                variant="contained"
                size="small"
                onClick={() => handleFilter("bottom")}
              >
                Search
              </ColorButton>
            </Stack> */}

            {/* <BottomNavigationAction
              onClick={() => handleFilter("bottom")}
              label="Search"
              icon={<SearchIcon />}
            />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
          </BottomNavigation>
        </Box>
      </Responsive>
    </ThemeProvider>
  );
}
