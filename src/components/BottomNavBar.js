import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography, ThemeProvider } from "@mui/material";
import { theme } from "./style";
import { styled } from "@mui/material/styles";



export default function SimpleBottomNavigation(props) {
  const { filterCmd } = props;
  const [value, setValue] = React.useState(null);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("mobile")]: {
      display: "none"
    },
  }));
  
  const handleFilter = (data) => {
    if(value === 0){
      filterCmd(data);

    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Responsive>
        <Box sx={{ width: winWidth, position: "fixed", bottom : 0 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction onClick={() => handleFilter("bottom")} label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </Responsive>
    </ThemeProvider>
  );
}
