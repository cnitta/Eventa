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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";

//For rendering of products
import Book from "@material-ui/icons/Book";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import productPageStyle from "assets/jss/material-kit-react/views/productPage.jsx";

class BookingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      currentBooking: null,
      isLoaded: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      redirect: false
    };
  }

  componentWillMount() {
    // Initialize Cart
    if (localStorage.getItem("cart") === null || typeof(localStorage.getItem("cart")) === undefined) {
      var myCart = {};
      localStorage.setItem("cart", JSON.stringify(myCart));
      // Set Cart current number of items
      localStorage.setItem("cartNumberOfItems", JSON.stringify(0));
    } else {
      // Set Cart current number of items
      var cartLength = (JSON.parse(localStorage.getItem("cart"))).length;
      localStorage.setItem("cartNumberOfItems", JSON.stringify(cartLength));
    }
  }

  componentDidMount() {
    if (this.state.isLoggedIn)
    fetch("api/bookings")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            bookings: result.message,
            isLoaded: result.success
          });
          console.log(this.state.bookings + "Success is " + result.success);
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

  handleClick(booking) {
    this.state.currentBooking = booking;
    this.setState({ redirect: true });
  }

  render() {
    const { classes, ...rest } = this.props;

    const { redirect } = this.state;

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/ind-booking",
            state: { booking: this.state.currentBooking },
            isLoggedIn: this.state.isLoggedIn
          }}
        />
      );

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
        <Parallax small filter image={require("assets/img/booking.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <h4 className={classes.title}>Bookings</h4>
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
                  tabName: "My Bookings",
                  tabIcon: Book,
                  tabContent: (
                    <div>
                      <h3> Your Bookings</h3>
                      <Paper className={classes.root}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Booking No.</TableCell>
                              <TableCell>Destination</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.bookings.map(booking => {
                              return (
                                <TableRow key={booking._id}>
                                  <TableCell component="th" scope="row">
                                    <Button
                                      color="primary"
                                      onClick={() => this.handleClick(booking)}
                                    >
                                      #{booking._id}
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    {booking.destination.address}
                                  </TableCell>
                                  <TableCell>{booking.status}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </div>
                  )
                }
              ]}
            />
          </div>
          <br />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(productPageStyle)(BookingPage);
