import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const BASE_URL = "https://3001-henryheyhey-espressoexp-1blfs1n110r.ws-us44.gitpod.io/"

export default function Products() {

    //state
    const [product, setProduct] = useState([]);

    //componment didmout
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(BASE_URL + 'api/products');
            setProduct(response.data);
        }
        fetchData();
        
    }, [])

    
    return (
        <React.Fragment>
            <h1>Product details</h1>
        </React.Fragment>

    )
}