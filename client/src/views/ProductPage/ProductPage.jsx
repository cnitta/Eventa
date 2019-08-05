import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Redirect, Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Swal from 'sweetalert2';

//For rendering of products
import {
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import productPageStyle from "assets/jss/material-kit-react/views/productPage.jsx";

let globalItemList = [];

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: null,
      isLoaded: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      unchangedItems: [],
      date: new Date(Date.now()),
      selectedEvent:
        this.props.location.state == null
          ? null
          : this.props.location.state.item,
      redirect: false,
      myCart: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentWillMount() {
      // Initialize Cart
      if (localStorage.getItem("cart") === null || typeof(localStorage.getItem("cart")) === undefined) {
        var myCart = {};
        localStorage.setItem("cart", JSON.stringify(myCart));
      } else {
        this.setState({ myCart: JSON.parse(localStorage.getItem("cart"))});
      }

    let currentItem = null;
    fetch("api/items/getAllItems")
      .then(res => res.json())
      .then(
        result => {
          let changedResult = result;
          console.log("The event is " + this.state.selectedEvent);

          let originalItems = changedResult.message;
          let newArray = changedResult.message;
          if (
            this.state.selectedEvent !== null &&
            this.state.selectedEvent !== ""
          ) {
            console.log("I am in here bruh");
            let itemsTemp = changedResult.message;
            
            console.log(itemsTemp);
            
            try {
              newArray = itemsTemp.filter(item => {
                currentItem = item;
                return item.eventType.includes(this.state.selectedEvent);
              });
            } catch (error) {
              console.log(currentItem);
            }
            console.log("New items temp is:");
            console.log(newArray);
            if (this.state.selectedEvent === ""){
              newArray = originalItems;
            }
            
          }

          this.setState({
            items: newArray,
            unchangedItems: originalItems,
            isLoaded: result.success
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentWillUnmount() {
    this.setState({
      selectedEvent: ""
    });
  }

  handleClick(item) {
    this.setState({ currentItem: item });
    this.setState({ redirect: true, selectedEvent: "" });
  }

  handleAddToCart(item) {
    this.setState({ myCart: [...this.state.myCart, item] });
    console.log("Handle Add to Cart: Cart: " + this.state.myCart);
    localStorage.setItem("cart", JSON.stringify(this.state.myCart));
    console.log(
      "Handle Add to Cart: localStorage: " +
        JSON.parse(localStorage.getItem("cart"))
    );
    Swal(
      'Added to Cart!',
      item.name + " is added to cart.",
      'success'
    )
  }

  handleChange(event) {
    let itemsList = this.state.unchangedItems;
    globalItemList = itemsList.filter(item => {
      return item.eventType.includes(event.target.value);
    });

    console.log("In handle change");
    console.log(event.target.value);

    if (event.target.value === ""){
      globalItemList = itemsList;
    }

    this.setState({
      selectedEvent: event.target.value,
      items: globalItemList
    });
  }

  render() {
    const { classes, ...rest } = this.props;

    const { redirect } = this.state;

    console.log("ProductPage: Cart contains:");
    console.log(this.state.myCart);
    localStorage.setItem("cart", JSON.stringify(this.state.myCart));
    console.log(
      "Cart Contains: localStorage: " + JSON.parse(localStorage.getItem("cart"))
    );

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/ind-product",
            state: { item: this.state.currentItem },
            isLoggedIn: this.state.isLoggedIn
          }}
        />
      );

    function dateDiff(date1, date2) {
      //Get 1 day in milliseconds
      var one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = new Date(date2).getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date1_ms - date2_ms;
      //take out milliseconds
      difference_ms = difference_ms / 1000;
      var seconds = Math.floor(difference_ms % 60);
      difference_ms = difference_ms / 60;
      var minutes = Math.floor(difference_ms % 60);
      difference_ms = difference_ms / 60;
      var hours = Math.floor(difference_ms % 24);
      var days = Math.floor(difference_ms / 24);

      if (days === 0 && hours === 0)
        return "Last updated " + minutes + " minutes ago";
      else if (days === 0)
        if (hours > 1) return "Last updated " + hours + " hours ago";
        else return "Last updated " + hours + "hour ago";
      else if (days > 1) return "Last updated " + days + " days ago";
      else return "Last updated " + days + " day ago";
    }

    return (
      <div>
        <Header
          brand="EVENTA"
          rightLinks={<HeaderLinks isLoggedIn={this.state.isLoggedIn} />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/heliumballoon.png")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <h4 className={classes.title}>Product List</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem>
                  <GridItem align="left">
                    <br />
                    <Breadcrumb tag="nav">
                      <BreadcrumbItem tag="a" href="/landing-page">
                        Home /
                      </BreadcrumbItem>
                      <BreadcrumbItem active tag="span">
                        {" "}
                        Products
                      </BreadcrumbItem>
                    </Breadcrumb>

                    <GridItem align="right">
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple" color="default">
                          Event:
                        </InputLabel>
                        <Select
                          native
                          value={this.state.selectedEvent}
                          onChange={this.handleChange}
                          input={<Input id="age-native-simple" />}
                        >
                          <option value={""}/>
                          <option value={"Birthday Celebration"}>
                            Birthday Celebration
                          </option>
                          <option value={"Wedding"}>Wedding</option>
                          <option value={"Picnic"}>Picnic</option>
                          <option value={"Family Gathering"}>
                            Family Gathering
                          </option>
                          <option value={"Theme Event"}>Theme Event</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridItem>
                </GridItem>

                {this.state.items.map((item, index) => {
                  // Code to retrieve image
                  const buffer = item.images[0].data;
                  if (typeof buffer !== "undefined" || buffer != null) {
                    var base64String = new Buffer(buffer).toString("base64");
                  }
                  return (
                    <GridItem key={index} xs={6} md={4}>
                      <div className="row">
                        <br />
                        <div className="col-sm-12">
                          <Card>
                            <CardBody style={{ height: "760px" }}>
                              <CardImg
                                className="text-center"
                                top
                                width="300px"
                                height="300px"
                                src={"data:image/jpeg;base64," + base64String}
                                alt="Card Image"
                              />
                              <CardTitle style={{ fontWeight: "bold" }}>
                                {item.name}
                              </CardTitle>
                              <CardText style={{ textAlign: "justify" }}>
                                {item.description.substring(0, 450) + "..."}
                              </CardText>
                              <div
                                style={{ bottom: "30px", position: "absolute" }}
                              >
                                <h5 className={classes.price}>
                                  ${item.price}.00
                                </h5>
                                <Button
                                  color="info"
                                  onClick={() => this.handleClick(item)}
                                >
                                  View Details
                                </Button>
                                <Button                                  
                                  color="rose"
                                  onClick={() => this.handleAddToCart(item)}
                                >
                                  Add To Cart
                                </Button>
                                <br />
                                {dateDiff(this.state.date, item.dateCreated)}
                              </div>
                            </CardBody>
                          </Card>
                          <br />
                        </div>
                      </div>
                    </GridItem>
                  );
                })}
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(productPageStyle)(ProductPage);
