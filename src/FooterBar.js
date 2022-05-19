import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';

export default function FooterBar() {
  const ref = React.useRef(null);

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

