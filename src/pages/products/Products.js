import React, { useContext, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { BASE_URL } from "../../constant/Constants";
import { Grid, Box, Paper } from "@mui/material";
import { useMatchMedia } from "../../components/useMatchMedia";
import { styled } from "@mui/material/styles";
import { Typography, ThemeProvider } from "@mui/material";
import { green, purple, red } from "@mui/material/colors";
import { theme } from "../../components/style";
import BottomNavBar from "../../components/BottomNavBar";
import Filter from "../../components/Filter";

const Responsive = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    // color: green[500],
  },
  [theme.breakpoints.up("tablet")]: {
    // color: purple[500],
  },
  [theme.breakpoints.up("desktop")]: {
    // color: red[500],
  },
}));

export default function Products(props) {
  const isDesktopResolution = useMatchMedia("(min-width:575px)", true);
  const isLaptopResoltion = useMatchMedia("(min-width:768px)", true);
  //state
  const [product, setProduct] = useState([]);
  const [textSearch, setTextSearch] = useState({
    productKeyword: "",
  });

  const [anchorOne, setAnchorOne] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [formSearch, setForm] = useState({
    product_text: "",
    min_price: "",
    max_price: "",
    roast_type: "",
    cert: [],
    origin: [],
  });

  const [roastType, setRoastType] = useState([]);
  // const [certType, setCertType] = useState([]);
  // const [originType, setOriginType] = useState();

  let context = useContext(UsersContext);
  //componment didmout
  useEffect(() => {
    const fetchProduct = async () => {
      let response = await axios.get(BASE_URL + "api/products");
      let roastRes = await axios.get(
        BASE_URL + "api/products/get/all/roast/type"
      );
      // let certRes = await axios.get(BASE_URL + 'api/products/get/cert/type');
      // let originRes = await axios.get(BASE_URL + 'api/products/get/country/origin');

      setRoastType(roastRes.data);
      // setCertType(certRes.data);
      // setOriginType(originRes.data);
      setProduct(response.data);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    // console.log(roastType)
  }, [roastType]);

  const onUpdateFormField = (e) =>
    setTextSearch({
      ...textSearch,
      [e.target.name]: e.target.value,
    });

  const onUpdateSearchFormField = (e) =>
    setForm({
      ...formSearch,
      [e.target.name]: e.target.value,
    });

  //back up code , not in use
  // const updateCheckboxes = (e) => {

  //     if (formSearch[e.target.name].includes(e.target.value)) {
  //         // case 1: the evt.target.value is already in the array
  //         let indexToRemove = formSearch[e.target.name].findIndex(v => {
  //             return v === e.target.value
  //         })
  //         let cloned = formSearch[e.target.name].slice();
  //         cloned.splice(indexToRemove, 1);
  //         setForm({
  //             ...formSearch,
  //             [e.target.name]: cloned
  //         })
  //     } else {
  //         // case 2: the evt.target.value is not in the array
  //         // it means: add evt.target.value to array

  //         let clone = formSearch[e.target.name].slice();
  //         clone.push(e.target.value);
  //         setForm({
  //             ...formSearch,
  //             [e.target.name]: clone
  //         })
  //     }
  // }

  const addToCart = async (e) => {
    //Check if access token is expired or not
    // true => your token is expired
    // false => your token is not expired
    let accessToken = localStorage.getItem("accessToken");
    let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
    if (!accessTokenNotExpired) {
      //call the profile api or cart
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      const requestBodyData = {
        user_id: localStorage.getItem("userId"),
        product_id: e.target.value,
      };
      await axios.post(BASE_URL + "api/shoppingCart/additem", requestBodyData, {
        headers,
      });
    } else {
      //need to prom for get new access token or ask user to sign in
      let result = await context.getRefreshToken();
      if (result) {
        addToCart(e);
      }
    }
  };

  const searchBytext = async () => {
    const reqbody = {
      keyword: textSearch.productKeyword,
    };

    let response = await axios.post(
      BASE_URL + "api/products/search/text",
      reqbody
    );
    setProduct(response.data);
  };

  const searchAllField = async () => {
    //to get the roast type index to query the coffee bean roast type id
    let roastTypeIdentifier = null;
    for (let e of roastType) {
      if (e[1] === formSearch.roast_type) {
        roastTypeIdentifier = e[0];
      }
    }
    const reqbody = {
      min_price: formSearch.min_price * 100,
      max_price: formSearch.max_price * 100,
      roast_type: roastTypeIdentifier,
      product_text: formSearch.product_text,
      // 'certificates': formSearch.cert,
      // 'origins': formSearch.origin
    };
    let response = await axios.post(
      BASE_URL + "api/products/filter/by",
      reqbody
    );
    console.log(response.data);
    setProduct(response.data);
  };

  //trigger filter
  const filterCmd = (data) => {
    setAnchorOne(data);
    setOpenDrawer(true); // open drawer
  };

  const updateDrawerState = (state) => {
    setOpenDrawer(state);
    setAnchorOne(null);
  };

  return (
    <React.Fragment>
      <div className="font-title" style={{marginTop: 90}}>
        Coffee Bean Products
      </div>
      <ThemeProvider theme={theme}>
        <Responsive>
          <div>
            <Container>
              <Row>
                {isDesktopResolution && (
                  <Col sm={12} md={4}>
                    <Card>
                      <Card.Body>
                        <div className="container">
                          <div>
                            <label>Text Search</label>
                            <input
                              type="text"
                              placeholder="Product text search"
                              name="product_text"
                              onChange={onUpdateSearchFormField}
                              value={formSearch.product_text}
                            />
                          </div>
                          <div>
                            <label>Select Roast Type</label>
                            <select
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
                            </select>
                          </div>
                          <div>
                            <label>Min price</label>
                            <input
                              type="text"
                              placeholder="Min price"
                              name="min_price"
                              onChange={onUpdateSearchFormField}
                              value={formSearch.min_price}
                            />
                          </div>
                          <div>
                            <label>Max price</label>
                            <input
                              type="text"
                              placeholder="Max price"
                              name="max_price"
                              onChange={onUpdateSearchFormField}
                              value={formSearch.max_price}
                            />
                          </div>
                          <button
                            className="btn btn-light list-tag mt-2"
                            onClick={searchAllField}
                          >
                            Search
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
                <Col md={8} sm={12}>
                  <Row>
                    {product.map((p, i) => {
                      return (
                        <Col sm={12} md={6} lg={4}>
                          <Card key={i} className="m-2 product-card">
                            <Link
                              to={"/details/" + p.id}
                              className="text-decoration-none text-reset"
                            >
                              <div style={{maxWidth : "600px", maxHeight : "600px"}}>
                              <Card.Img
                                variant="top"
                                src={p.image_url}
                                key={p.image_url}
                                style={{ borderRadius: 25, width: "100%", height: isLaptopResoltion ? "142px" : "auto", objectFit: "fill" }}
                              />
                              </div>
                              
                              <Card.Body key={p.product_name}>
                                <Card.Title className="font-title-edit">
                                  {" "}
                                  {p.product_name}
                                </Card.Title>
                                <Card.Text className="font-title-edit">
                                  Price S$({parseInt(p.price) / 100})
                                </Card.Text>
                              </Card.Body>
                            </Link>
                            <Button
                              variant="light"
                              value={p.id}
                              className="list-tag"
                              onClick={addToCart}
                            >
                              Add to Cart
                            </Button>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </Container>
            {/* add this line to increase the height */}
            <div style={{height : "80px"}}></div>
          </div>
            <BottomNavBar filterCmd={filterCmd} />
          {openDrawer && (
            <Filter
              anchor={anchorOne}
              openDrawer={openDrawer}
              updateDrawerState={updateDrawerState}
            />
          )}
        </Responsive>
      </ThemeProvider>
    </React.Fragment>
  );
}
