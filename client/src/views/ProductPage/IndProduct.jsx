import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Redirect, Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Badge from "components/Badge/Badge.jsx";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Swal from "sweetalert2";

//For rendering of products
import {
  Media,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import productPageStyle from "assets/jss/material-kit-react/views/productPage.jsx";
import Tooltip from "@material-ui/core/Tooltip";

class IndProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null,
      item: null,
      isLoaded: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      myCart: []
    };
  }

  componentWillMount() {
    // Initialize Cart
    if (
      localStorage.getItem("cart") === null ||
      typeof localStorage.getItem("cart") === undefined
    ) {
      var myCart = {};
      localStorage.setItem("cart", JSON.stringify(myCart));
    } else {
      this.setState({ myCart: JSON.parse(localStorage.getItem("cart")) });
    }
  }

  componentDidMount() {
    const itemId = this.props.location.state.item._id;
    const urlcall = "api/items/" + itemId;
    fetch(urlcall)
      .then(res => res.json())
      .then(
        result => {
          console.log(result.message);
          this.setState({
            item: result.message,
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

  handleAddToCart(item) {
    this.setState({ myCart: [...this.state.myCart, item] });
    console.log("Handle Add to Cart: Cart: " + this.state.myCart);
    localStorage.setItem("cart", JSON.stringify(this.state.myCart));
    console.log(
      "Handle Add to Cart: localStorage: " +
        JSON.parse(localStorage.getItem("cart"))
    );
    Swal("Added to Cart!", item.name + " is added to cart.", "success");
    this.setState({ redirect: true });
  }

  render() {
    const { classes, ...rest } = this.props;

    const { redirect } = this.state;
    const isLoggedIn = this.state.isLoggedIn;

    console.log("IndProductPage: Cart contains:");
    console.log(this.state.myCart);
    localStorage.setItem("cart", JSON.stringify(this.state.myCart));
    console.log(
      "Cart Contains: localStorage: " + JSON.parse(localStorage.getItem("cart"))
    );

    const canDeliver = this.props.location.state.item.delivery.canDeliver;
    const canSetup = this.props.location.state.item.delivery.canSetup;
    const canPickup = this.props.location.state.item.delivery.canPickup;

    if (redirect) {
      if (isLoggedIn) {
        return (
          <Redirect
            to={{
              pathname: "/cart-page",
              state: { item: this.state.currentItem },
              isLoggedIn: this.state.isLoggedIn
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login-page",
              isLoggedIn: true
            }}
          />
        );
      }
    }

    console.log("This is the item passed: ");
    console.log(
      "Name: " +
        this.props.location.state.item.name +
        ", Id: " +
        this.props.location.state.item._id +
        ", Owner: " +
        this.props.location.state.item.ownerName +
        ", Category: " +
        this.props.location.state.item.category
    );

    // Code to retrieve image
    const buffer = this.props.location.state.item.images[0].data;
    if (typeof buffer !== "undefined" || buffer != null) {
      var base64String = new Buffer(buffer).toString("base64");
    }

    return (
      <div>
        <div>
          <Header
            brand="EVENTA"
            rightLinks={<HeaderLinks isLoggedIn={this.state.isLoggedIn} />}
            fixed
            color="white"
            changeColorOnScroll={{
              height: 200,
              color: "white"
            }}
            {...rest}
          />
        </div>
        <div>
          <Parallax
            small
            filter
            image={require("assets/img/heliumballoon.png")}
          >
            <div className={classes.container}>
              <GridContainer>
                <GridItem>
                  <h4 className={classes.title}>Product</h4>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>

          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="left">
                  <br />
                  <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="/landing-page">
                      Home /
                    </BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="/product-page">
                      {" "}
                      Products /
                    </BreadcrumbItem>
                    <BreadcrumbItem active tag="span">
                      {" "}
                      Individual Product
                    </BreadcrumbItem>
                  </Breadcrumb>
                </GridContainer>

                <GridContainer>
                  <GridItem>
                    {/* Can Deliver Badge */}
                    {canDeliver ? (
                      <Badge alignLeft color="success">
                        <i className="#" />
                        Can Deliver
                      </Badge>
                    ) : (
                      <Badge alignLeft color="danger">
                        <i className="#" />
                        Cannot Deliver
                      </Badge>
                    )}

                    {/* Can Set Up Badge */}
                    {canSetup ? (
                      <Badge alignLeft color="success">
                        <i className="#" />
                        Can Set Up
                      </Badge>
                    ) : (
                      <Badge alignLeft color="danger">
                        <i className="#" />
                        Cannot Set Up
                      </Badge>
                    )}

                    {/* Can Pick Up Badge */}
                    {canPickup ? (
                      <Badge alignLeft color="success">
                        <i className="#" />
                        Can Pick Up
                      </Badge>
                    ) : (
                      <Badge alignLeft color="danger">
                        <i className="#" />
                        Cannot Pick Up
                      </Badge>
                    )}
                  </GridItem>

                  <GridItem xs={5} justify="left">
                    <Media>
                      <Media heading>
                        <h4 className={classes.producttitle}>
                          {this.props.location.state.item.name}
                        </h4>
                        <h4 className={classes.productsubtitle}>
                          Manufactured by{" "}
                          {this.props.location.state.item.manufacturer}
                        </h4>
                        <h5 className={classes.price}>
                          ${this.props.location.state.item.price}.00
                        </h5>
                      </Media>
                      <Media left href="#">
                        <br />
                        <Media
                          object
                          width="400em"
                          height="400em"
                          src={"data:image/jpeg;base64," + base64String}
                          alt="Card Image"
                        />
                      </Media>
                      <Media center body>
                        {" "}
                      </Media>
                      <br />
                    </Media>
                  </GridItem>

                  <GridItem
                    xs={4}
                    justify="center"
                    style={{ borderRadius: "5px" }}
                  >
                    <h5
                      className={classes.description}
                      style={{ textAlign: "justify" }}
                    >
                      {this.props.location.state.item.description}
                    </h5>
                  </GridItem>

                  <GridItem xs={3} justify="right">
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading className={classes.productspecs}>
                          {" "}
                          <b>Owned By:</b>
                        </ListGroupItemHeading>
                        <ListGroupItemText className={classes.productspecs}>
                          {this.props.location.state.item.ownerName}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading className={classes.productspecs}>
                          {" "}
                          <b>Category:</b>
                        </ListGroupItemHeading>
                        <ListGroupItemText className={classes.productspecs}>
                          {this.props.location.state.item.category}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading className={classes.productspecs}>
                          {" "}
                          <b>Condition:</b>
                        </ListGroupItemHeading>
                        <ListGroupItemText className={classes.productspecs}>
                          {this.props.location.state.item.condition}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading className={classes.productspecs}>
                          {" "}
                          <b>Deposit Fee:</b>
                        </ListGroupItemHeading>
                        <ListGroupItemText className={classes.productspecs}>
                          {this.props.location.state.item.depositFee}
                        </ListGroupItemText>
                      </ListGroupItem>
                      {/* <ListGroupItem>
                          <ListGroupItemHeading> Price:</ListGroupItemHeading>
                          <ListGroupItemText>
                            {this.props.location.state.item.price}
                          </ListGroupItemText>
                        </ListGroupItem> */}
                    </ListGroup>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button
                      alignCenter
                      color="rose"
                      onClick={() =>
                        this.handleAddToCart(this.props.location.state.item)
                      }
                    >
                      + Add To Cart
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>

          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(productPageStyle)(IndProduct);
