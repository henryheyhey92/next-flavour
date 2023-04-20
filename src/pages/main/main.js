import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import mainimg from "../../image/mainimg.jpg";
import { Grid } from "@mui/material";
import coffeetagline from '../../image/coffeetagline.png';
import bodyimg from '../../image/bodyimg.png';

function Main(props) {

    const [mainImgWidth, setMainImgWidth] = useState(window.innerWidth);
    const [mainImgHeight, setMainImgHeight] = useState(window.innerHeight);


    useEffect(()=> {
        window.addEventListener('resize', handleResize);
    }, [mainImgWidth])
    const handleResize = ()=> {
        setMainImgWidth(window.innerWidth);
        setMainImgHeight(window.innerHeight);
        // setMainImgHeight(window.innerHeight);
    }
  return (
    <Box sx={{ width: "auto", height: "100%" }}>
        <div style={{position: "relative"}}>
        <img src={mainimg} style={{ display: "flex", objectFit: "contain", width: mainImgWidth, position: "relative"}} alt="coffee pic" />
        <img src={coffeetagline} style={{ position: "absolute", top: mainImgHeight * 0.1, left: mainImgWidth * 0.1, width: mainImgWidth * 0.4}} alt="coffee pic 2" />
        </div>
        <Grid container>
            <Grid item xs={12}>

            </Grid>
        </Grid>
    </Box>
  );
}

export default Main;
