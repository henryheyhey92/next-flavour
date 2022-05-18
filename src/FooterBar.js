import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

export default function FooterBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  function triggerSearchUI(){
   
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, width: '100%', height: '5%'  }} elevation={3}>
        <BottomNavigation showLabels>
          {/* <BottomNavigationAction label="Search" 
                                  icon={<SearchSharpIcon />}
                                  onClick={triggerSearchUI()} /> */}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

