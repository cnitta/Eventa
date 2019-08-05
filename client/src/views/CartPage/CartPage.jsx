import React from "react";

// react components for routing our app without refresh
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";

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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Breadcrumb, BreadcrumbItem, Media } from "reactstrap";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Shopping_Cart from "@material-ui/icons/ShoppingCart";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Spinner from 'reactjs-simple-spinner';
import CreditCardInput from 'react-credit-card-input';
import Swal from 'sweetalert2';

// For Checkout Dialog
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import cartPageStyle from "assets/jss/material-kit-react/views/cartPage.jsx";
import { Icon } from "@material-ui/core";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      currentItem: null,
      date: new Date(Date.now()),
      redirect: false,
      dialogOpen: false,
      myCart: [],
      paymentProcessingOpen: false
    };
  }

  componentWillMount() {
    // Initialize Cart
    if (localStorage.getItem("cart") === null || typeof(localStorage.getItem("cart")) === undefined) {
      var myCart = {};
      localStorage.setItem("cart", JSON.stringify(myCart));
      this.setState({ myCart: JSON.parse(localStorage.getItem("cart"))});
    } else {
      this.setState({ myCart: JSON.parse(localStorage.getItem("cart"))});
    }    

    let itemIdArray = [];
    this.state.myCart.forEach(function(element) {
      console.log(element);
      itemIdArray.push(element._id);
      console.log("itemIdArray should contain item Ids inside cart: ");
      console.log(itemIdArray);
    });
    let forEachNumber = 0;
    itemIdArray.forEach(itemIDD => {
      fetch("api/items/" + itemIDD)
        .then(res => res.json())
        .then(
          result => {
            console.log("im here");
            console.log(forEachNumber);
            console.log(itemIDD);
            console.log("And theresult is ");
            console.log(result);
            forEachNumber++;
            this.state.items.push(result.message);
            console.log("In this.state is ");
            console.log(this.state.items);
            this.setState({
              items: this.state.items,
              isLoaded: result.success
            });
          },
          error => {
            console.log("gg.com");
          }
        );
    });
  }
 
  // For Checkout Dialog
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  // For Checkout
  generateItemIdArray() {
    let myCart = this.state.myCart;

    var itemIds = [];
    var counter = 0;

    myCart.map(item => {
      itemIds[counter] = '"' + item._id.toString() + '"';
      counter++;
    });

    return itemIds;
  }
  generateItemNameArray() {
    let myCart = this.state.myCart;

    var itemNames = [];
    var counter = 0;

    myCart.map(item => {
      itemNames[counter] = "\"" + item.name.toString() + "\"";
      counter++;
    });

    return itemNames;
  }
  generateItemOwnerArray() {
    let myCart = this.state.myCart;

    var itemOwners = [];
    var counter = 0;

    myCart.map(item => {
      itemOwners[counter] = "\"" + item.owner.toString() + "\"";
      counter++;
    });

    return itemOwners;
  }

  // For Sum Functions
  calculateCartSum() {
    let myCart = this.state.myCart;
    var sum = 0;

    if (myCart.length > 0) {
      myCart.map(item => {
        sum += item.price;
        sum += item.depositFee;
      });
    }

    return sum;
  }
  calculateRentalSum() {
    let myCart = this.state.myCart;
    var sum = 0;

    if (myCart.length > 0) {
      myCart.map(item => {
        sum += item.price;
      });
    }

    return sum;
  }
  calculateDepositSum() {
    let myCart = this.state.myCart;
    var sum = 0;

    if (myCart.length > 0) {
      myCart.map(item => {
        sum += item.depositFee;
      });
    }

    return sum;
  }

  render() {
    const { classes, ...rest } = this.props;

    const { redirect } = this.state;

    console.log("CartPage: Cart contains: " + this.state.myCart);
    console.log("Cart Contains: localStorage: " + JSON.parse(localStorage.getItem("cart")));

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/booking-page",
            isLoggedIn: true
          }}
        />
      );

    let myItem = [];
    if (this.state.myCart.length > 0) {
      myItem = this.state.myCart;
    }
    console.log("Item in render is:");
    console.log(myItem);
    console.log("end of render retrieval");

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
        <Parallax small filter image={require("assets/img/shoppingbag.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <h4 className={classes.title}>Cart</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <CustomTabs
              headerColor="primary"
              tabs={[
                {
                  tabName: "My Cart",
                  tabIcon: Shopping_Cart,
                  tabContent: (
                    <div>
                      <h3>Your Items</h3>
                      <Paper className={classes.root}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell>Images</TableCell>
                              <TableCell numeric>$ Rental Fee</TableCell>
                              <TableCell numeric>$ Damage Deposit</TableCell>
                              <TableCell>Delete From Cart</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {/* Object.keys(this.state.myCart) */}
                            {myItem.map((cartItem, index) => {
                              const buffer = cartItem.images[0].data;
                              if (
                                typeof buffer !== "undefined" ||
                                buffer != null
                              ) {
                                var base64String = new Buffer(buffer).toString(
                                  "base64"
                                );
                              }
                              return (
                                <TableRow key={cartItem._id}>
                                  <TableCell component="th" scope="row">
                                    {cartItem.name}
                                  </TableCell>
                                  <TableCell>
                                    <Media
                                      object
                                      width="80px"
                                      height="80px"
                                      src={
                                        "data:image/jpeg;base64," + base64String
                                      }
                                      alt="Card Image"
                                    />
                                  </TableCell>
                                  <TableCell numeric>
                                    {cartItem.price}
                                  </TableCell>
                                  <TableCell numeric>
                                    {cartItem.depositFee}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      onClick={() => {
                                        myItem.splice(index, 1);
                                        this.setState({ myCart: myItem });
                                        localStorage.setItem("cart", JSON.stringify(myItem));
                                        Swal(
                                          'Deleted from Cart!',
                                          cartItem.name + " is deleted from cart.",
                                          'success'
                                        )
                                      }}                                 
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Paper>

                      {/* Display Total Cost */}
                      <h6>────────────────────────</h6>
                      <h4>
                        <b>Subtotal:</b>
                      </h4>
                      <h6>Rental Fee     : SGD${this.calculateRentalSum()}</h6>
                      <h6>Damage Deposit : SGD${this.calculateDepositSum()}</h6>
                      <h6>────────────────────────</h6>
                      <h4>
                        <b>Total Price:</b> SGD${this.calculateCartSum()}
                      </h4>

                      {/* Handle Checkout (Payment and Booking) */}
                      <Button                        
                        variant="contained"
                        color="primary"
                        size="lg"
                        onClick={this.handleDialogOpen}
                      >
                        Checkout
                      </Button>
                      <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleDialogClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Event Details
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please enter your event's details below!
                          </DialogContentText>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="eventName"
                            label="Event Name"
                            type="string"
                            fullWidth
                          />
                          <TextField
                            required
                            margin="dense"
                            id="startDateTime"
                            label="Start Date and Time e.g. 11/11/2018 11:11 AM"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            fullWidth
                          />
                          <TextField
                            required
                            margin="dense"
                            id="endDateTime"
                            label="End Date and Time e.g. 11/11/2018 11:11 AM"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            fullWidth
                          />
                          <TextField
                            required
                            margin="dense"
                            id="destinationAddress"
                            label="Destination Address"
                            type="string"
                            fullWidth
                          />
                          <TextField
                            required
                            margin="dense"
                            id="destinationPostalCode"
                            label="Destination Postal Code"
                            type="number"
                            fullWidth
                          />
                        </DialogContent>
                        <DialogTitle id="form-dialog-title">
                          Payment Details
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please enter your payment details below!
                          </DialogContentText>
                          <TextField
                            margin="dense"
                            id="nameOnCard"
                            label="Cardholder's Name"
                            type="string"
                            fullWidth
                          />
                          <CreditCardInput
                            // cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
                            // cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
                            // cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
                            fieldClassName="creditCardInput"
                          />
                        </DialogContent>
                        <Dialog
                          open={this.state.paymentProcessingOpen}>
                          <DialogContent>
                            <Spinner size="large" message="Please Wait While We Process Your Payment..."/>
                          </DialogContent>
                        </Dialog>
                        <DialogActions>
                          <Button
                            onClick={this.handleDialogClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              // Show Payment Processing spinner
                              this.setState({ paymentProcessingOpen: true });

                              // Create a string for an HTTP body message
                              const itemIdArray = this.generateItemIdArray();
                              const itemNameArray = this.generateItemNameArray();
                              const itemOwnerArray = this.generateItemOwnerArray();
                              const totalPrice = this.calculateCartSum();
                              const destinationAddress = document.getElementById(
                                "destinationAddress"
                              ).value;
                              const destinationPostalCode = document.getElementById(
                                "destinationPostalCode"
                              ).value;
                              const startDateTime = document.getElementById(
                                "startDateTime"
                              ).value;
                              const endDateTime = document.getElementById(
                                "endDateTime"
                              ).value;
                              const eventName = document.getElementById(
                                "eventName"
                              ).value;

                              // Actual Form (Intended Attributes)
                              const formData = `{
                                "items": [${itemIdArray}],
                                "itemNames": [${itemNameArray}], 
                                "itemOwners": [${itemOwnerArray}],                                  
                                "destination": {"address": "${destinationAddress}","postal": ${destinationPostalCode}}, 
                                "price": ${totalPrice}, 
                                "start": "${startDateTime}", 
                                "end": "${endDateTime}", 
                                "eventName": "${eventName}"
                              }`;

                              // Create an AJAX request
                              const xhr = new XMLHttpRequest();
                              xhr.open("post", "/api/bookings", true);
                              xhr.setRequestHeader(
                                "Content-type",
                                "application/json; charset=utf-8"
                              );
                              xhr.onload = function() {
                                // Close Payment Processing spinner
                                this.setState({ paymentProcessingOpen: false });

                                if (xhr.status === 200) {
                                  console.log("PAYMENT AND BOOKING SUCCESS");

                                  // Reset the local storage (test)
                                  localStorage.clear();

                                  // Set loggedIn localStorage variable to True (test)
                                  localStorage.setItem("isLoggedIn", JSON.stringify("true"));
                                  console.log(JSON.parse(localStorage.getItem("isLoggedIn")));

                                  // Clear Cart on Payment Success
                                  var clearCart = {};
                                  localStorage.setItem("cart", JSON.stringify(clearCart));
                                  this.setState({ myCart: clearCart });

                                  // Close Dialog Box
                                  this.handleDialogClose();

                                  // Redirect to Booking page on Payment Success
                                  Swal(
                                    'Payment Successful!',
                                    'Thank you for booking with Eventa!',
                                    'success'
                                  )
                                  this.setState({ redirect: true });
                                } else {
                                  console.log("PAYMENT AND BOOKING FAILURE");

                                  // Close Dialog Box
                                  this.handleDialogClose();

                                  // Show error message on payment failure
                                  Swal(
                                    'Payment Failed',
                                    'Please try again.',
                                    'error'
                                  )
                                }
                              }.bind(this);
                              console.log(formData);
                              xhr.send(formData);
                            }}
                          >
                            Make Payment
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )
                }
              ]}
            />
          </div>
          <br />
        </div>
        ;<Footer />
      </div>
    );
  }
}

export default withStyles(cartPageStyle)(CartPage);
