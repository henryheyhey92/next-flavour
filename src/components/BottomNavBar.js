import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography, ThemeProvider } from "@mui/material";
import { theme } from "./style";
import { styled } from "@mui/material/styles";


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const Responsive = styled("div")(({ theme }) => ({
    
    [theme.breakpoints.up("mobile")]: {
      display: "none"
    },
    // [theme.breakpoints.up("desktop")]: {
    //   display: "none"
    // },
  }));
  return (
    <ThemeProvider theme={theme}>
      <Responsive>
        <Box sx={{ width: 500, position: "fixed", bottom : 0 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </Responsive>
    </ThemeProvider>
  );
}
