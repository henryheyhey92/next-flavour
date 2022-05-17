import React, { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import axios from 'axios'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import UsersContext from '../../contexts/UsersContext';
// import { BASE_URL } from '../../constant/Constants';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';




const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"

export default function Products() {

    //state
    const [product, setProduct] = useState([]);
    const [textSearch, setTextSearch] = useState({
        productKeyword: ""
    });

    const [formSearch, setForm] = useState({
        product_text: "",
        min_price: "",
        max_price: "",
        roast_type: ""
    })

    const [roastType, setRoastType] = useState([]);
    const [certType, setCertType] = useState();
    const [originType, setOriginType] = useState();

    let context = useContext(UsersContext);
    //componment didmout
    useEffect(() => {
        const fetchProduct = async () => {
            console.log("roats type hahaha")
            let response = await axios.get(BASE_URL + 'api/products');
            let roastRes = await axios.get(BASE_URL + 'api/products/get/all/roast/type');
            let certRes = await axios.get(BASE_URL + 'api/products/get/cert/type');
            let originRes = await axios.get(BASE_URL + 'api/products/get/country/origin');

            setRoastType(roastRes.data);
            setCertType(certRes.data);
            setOriginType(originRes.data);
            setProduct(response.data);
            console.log(response.data);
        }
        fetchProduct()
    }, [])

    useEffect(() => {
        console.log(roastType)
    }, [roastType])

    const onUpdateFormField = (e) => setTextSearch({
        ...textSearch,
        [e.target.name]: e.target.value
    })

    const onUpdateSearchFormField = (e) => setForm({
        ...formSearch,
        [e.target.name]: e.target.value
    })

    const addToCart = async (e) => {
        //Check if access token is expired or not
        // true => your token is expired
        // false => your token is not expired  
        let accessToken = localStorage.getItem("accessToken");
        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        if (!accessTokenNotExpired) {
            //call the profile api or cart 
            const headers = {
                'Authorization': "Bearer " + accessToken
            }
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': e.target.value
            }
            let response = await axios.post(BASE_URL + 'api/shoppingCart/additem', requestBodyData, { headers });
        } else {
            //need to prom for get new access token or ask user to sign in
            let result = await context.getRefreshToken();
            if (result) {
                addToCart(e);
            }

        }
    }


    const searchBytext = async () => {
        const reqbody = {
            'keyword': textSearch.productKeyword
        }

        let response = await axios.post(BASE_URL + 'api/products/search/text', reqbody);
        setProduct(response.data);
    }

    const searchAllField = async () => {

        //to get the roast type index to query the coffee bean roast type id
        let roastTypeIdentifier = null;
        for(let e of roastType){
            if(e[1] === formSearch.roast_type){
                roastTypeIdentifier = e[0]
            }
        }
        ////

        const reqbody = {
            'min_price': formSearch.min_price,
            'max_price': formSearch.max_price,
            'roast_type': roastTypeIdentifier
        }
        let response = await axios.post(BASE_URL + 'api/products/filter/by', reqbody);
        console.log(response.data);
        setProduct(response.data)
    }

    // const renderRadioOption = () => {
    //     let options = [];
    //     let temp = [];
    //     //get the data 
    //     if (roastType) {
    //         temp = roastType
    //         console.log("Print temp");
    //         console.log(temp);
    //     }
    //     if (temp) {
    //         for (let o of temp) {
    //             options.push(
    //                 <FormControlLabel
    //                     key={o.id}  
    //                     // value={o.value}
    //                     control={<Radio />}
    //                     label={o.name}
    //                     name='roastType'
    //                     // onChange={this.updateFormField}
    //                     // checked={this.state.category.includes(o.value)}
    //                     style={{ minWidth: 125 }} />
    //             )
    //             console.log(o)
    //         }
    //     }

    //     return options;
    // }

    // renderCheckboxOption() {
    //     let temp = [];
    //     if (this.state.mediumOptions.medium) {
    //         temp = this.state.mediumOptions.medium
    //     }
    //     if (temp) {
    //         return temp.map(e => {
    //             return <React.Fragment key={e.value}>
    //                 <FormControlLabel
    //                     control={
    //                         <Checkbox
    //                             name="medium"
    //                             value={e.value}
    //                             onChange={this.updateCheckboxes}
    //                             checked={this.state.medium.includes(e.value)}
    //                             sx={{ pr: 1 }}
    //                         />
    //                     } label={e.name}
    //                 />
    //             </React.Fragment>
    //         })
    //     }
    //     return temp
    // }

    return (
        <React.Fragment>
            <Typography className="lead fs-2" sx={{ ml: 2 }}>Coffee Bean Products</Typography>
            <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto', m: 2 }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    name="productKeyword"
                    value={textSearch.productKeyword}
                    onChange={onUpdateFormField}
                />
                <IconButton type="submit" sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={searchBytext}>
                    <SearchIcon />
                </IconButton>

                {/* other search feature */}

                {/* <Paper component="form" sx={{ p: '2px 4px', width: "100%", mt: 3 }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel id="checkbox-group-label">Certificate</FormLabel>
                        <FormGroup
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                            {renderCheckboxOption()}
                        </FormGroup>
                    </FormControl>
                </Paper>

                <Paper component="form" sx={{ p: '2px 4px', width: "100%", mt: 3 }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel id="checkbox-group-label">Origin</FormLabel>
                        <FormGroup
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                            {renderCheckboxOption()}
                        </FormGroup>
                    </FormControl>
                </Paper> */}

            </Paper>

            <Paper sx={{ p: '2px 4px', width: "auto", minheight: "200px", m: 3 }} elevation={3} >
                <div>
                    <label>Text Search</label>
                    <input type="text"
                        placeholder="Product text search"
                        name='product_text'
                        onChange={onUpdateSearchFormField}
                        value={formSearch.product_text}
                    />
                </div>
                <div>
                    <label>Example select</label>
                    <select name="roast_type"
                            onChange={onUpdateSearchFormField}
                            value={formSearch.roast_type}>
                        <option>---------</option>
                        {roastType ? roastType.map((element, i) => {
                            return <option key={element[1]}
                                    value={element[1]}>{element[1]}</option>
                        }):  <option>---------</option>}
                        
                    </select>
                </div>
                <div>
                    <label>Min price</label>
                    <input type="text"
                        placeholder="Min price"
                        name='min_price'
                        onChange={onUpdateSearchFormField}
                        value={formSearch.min_price}
                    />
                </div>
                <div>
                    <label>Max price</label>
                    <input type="text"
                        placeholder="Max price"
                        name='max_price'
                        onChange={onUpdateSearchFormField}
                        value={formSearch.max_price} />
                </div>
                <button class="btn btn-primary" onClick={searchAllField}>Search</button>

            </Paper>

            <Paper component="form" sx={{ p: '2px 4px', width: "auto", m: 3 }} elevation={3} >
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel id="category-group-label">Roast Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}
                    >
                        {/* {renderRadioOption} */}
                    </RadioGroup>
                </FormControl>
            </Paper>
            {/* add in accordino */}

            <Row xs={1} md={3} className="g-3">
                {product ? product.map((p) => (
                    <Col>
                        <Card className="rounded-0" key={p.id}>
                            <Link to={"/details/" + p.id} className="text-decoration-none text-reset">
                                <Card.Img className="rounded-0" variant="top" src={p.image_url} key={p.image_url} />
                                <Card.Body key={p.product_name}>
                                    <Card.Text className="lead fs-5" >
                                        {p.product_name} ({p.description})
                                        <Card.Text sx={{ m: 1 }}>
                                            ({p.price}) 
                                        </Card.Text>
                                        <Card.Text sx={{ m: 1 }}>
                                            ({p.roastType.name}) 
                                        </Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                            <Button variant="dark"
                                className="lead fs-5 rounded-0"
                                value={p.id}
                                onClick={addToCart}
                            >Add to Cart</Button>
                        </Card>
                    </Col>
                )) : <h1>Loading</h1>}
            </Row>

        </React.Fragment>

    )
}