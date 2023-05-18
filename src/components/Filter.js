import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import "./customstyle.css";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const Filter = (props) => {
  const { anchor, openDrawer, updateDrawerState } = props;
  const [winHeight, setWinHeight] = useState(window.innerHeight);
  const [formSearch, setForm] = useState({
    product_text: "",
    min_price: "",
    max_price: "",
    roast_type: "",
    cert: [],
    origin: [],
  });

  const toggleDrawer = (anchor, open) => (event) => {
    // if (
    //   event &&
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return;
    // }
    updateDrawerState(open);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const list = (anchor) => (
    <Box
      sx={{
        width: "auto",
      }}
      // TransitionComponent={Transition}
    >
      {/* the div for text search */}

      {/* price range slider  */}

      {/* roast type */}

      <div className="container">
        <div>
          <label>Text Search</label>
          <input
            type="text"
            placeholder="Product text search"
            name="product_text"
            // onChange={onUpdateSearchFormField}
            // value={formSearch.product_text}
          />
        </div>
        <div>
          <label>Select Roast Type</label>
          {/* <select
            name="roast_type"
            onChange={onUpdateSearchFormField}
            value={formSearch.roast_type}
          >
            <option>---------</option>
            {roastType ? (
              roastType.map((element, i) => {
                return (
                  <option key={element[1]} value={element[1]}>
                    {element[1]}
                  </option>
                );
              })
            ) : (
              <option>---------</option>
            )}
          </select> */}
        </div>
        <div>
          <label>Min price</label>
          <input
            type="text"
            placeholder="Min price"
            name="min_price"
            // onChange={onUpdateSearchFormField}
            // value={formSearch.min_price}
          />
        </div>
        <div>
          <label>Max price</label>
          <input
            type="text"
            placeholder="Max price"
            name="max_price"
            // onChange={onUpdateSearchFormField}
            // value={formSearch.max_price}
          />
        </div>
      </div>
      <Button variant="contained" onClick={toggleDrawer(anchor, false)}>
        Filter
      </Button>
    </Box>
  );

  return (
    <React.Fragment>
      <Dialog
        variant="permanent"
        fullScreen
        open={openDrawer}
        onClose={() => toggleDrawer(anchor, true)}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            top: 0.4 * window.innerHeight,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
          },
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(anchor, false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filter
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {list(anchor)}
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default Filter;
