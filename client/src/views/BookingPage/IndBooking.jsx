import React from "react";
import Time from "react-time";
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
import { Breadcrumb, BreadcrumbItem, Media } from "reactstrap";
import DoctorMapContainer from "../Components/DoctorMapContainer.js";
import productPageStyle from "assets/jss/material-kit-react/views/productPage.jsx";
import { Grid } from "@material-ui/core";

class IndBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      currentBooking: null,
      booking: null,
      isLoaded: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn"))
    };
  }

  componentWillMount() {
    let itemIdArrays = this.props.location.state.booking.items;
    let forEachNumber = 0;
    itemIdArrays.forEach(itemIDD => {
      fetch("api/items/" + itemIDD)
        .then(res => res.json())
        .then(
          result => {
            console.log(forEachNumber);
            console.log(itemIDD);
            console.log("And theresult is ");
            console.log(result);
            forEachNumber++;
            this.state.item.push(result.message);
            console.log("In this.state is ");
            console.log(this.state.item);
            this.setState({
              item: this.state.item,
              isLoaded: result.success
            });
          },
          error => {
            console.log("gg.com");
          }
        );
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    let item = [];
    if (this.state.item !== null) {
      item = this.state.item;
    }

    console.log("Item in render is:");
    console.log(item);
    console.log("end of render retrieval");

    // console.log("This is the item passed: ")
    // console.log("Item Name: " + item.name + ", Item Owner: " + item.owner);
    // console.log("This is the booking passed: ")
    // console.log("Address: " + this.props.location.state.booking.destination.address + ", Postal Code: " + this.props.location.state.booking.destination.postal);

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
          <Parallax small filter image={require("assets/img/booking.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem>
                  <h4 className={classes.title}>Booking</h4>
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
                    <BreadcrumbItem tag="a" href="/booking-page">
                      {" "}
                      Bookings /
                    </BreadcrumbItem>
                    <BreadcrumbItem active tag="span">
                      {" "}
                      Individual Booking
                    </BreadcrumbItem>
                  </Breadcrumb>
                </GridContainer>

                <GridItem>
                  <b>Event Name:</b>{" "}
                  {this.props.location.state.booking.eventName}
                  <br />
                  <b>Event Start Time:</b>{" "}
                  <Time
                    value={this.props.location.state.booking.start}
                    format="DD/MM/YYYY HH:mm"
                  />
                  <br />
                  <b>Event End Time:</b>{" "}
                  <Time
                    value={this.props.location.state.booking.end}
                    format="DD/MM/YYYY HH:mm"
                  />
                  <br />
                  <b>Booking Status:</b>{" "}
                  {this.props.location.state.booking.status}
                  <br />
                  <b>Driver Name:</b> Johny
                  <br />
                  <br />
                </GridItem>

                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "My Booking Items",
                      tabIcon: Book,
                      tabContent: (
                        <div>
                          <h3> Your Bookings</h3>
                          <Paper className={classes.root}>
                            <Table className={classes.table}>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Item Name</TableCell>
                                  <TableCell>Item Preview</TableCell>
                                  <TableCell>Item Vendor</TableCell>
                                  <TableCell>Item Price</TableCell>
                                  <TableCell>Deposit Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.map(item => {
                                  const buffer = item.images[0].data;
                                  if (
                                    typeof buffer !== "undefined" ||
                                    buffer != null
                                  ) {
                                    var base64String = new Buffer(
                                      buffer
                                    ).toString("base64");
                                  }
                                  return (
                                    <TableRow key={item._id}>
                                      <TableCell component="th" scope="row">
                                        {item.name}
                                      </TableCell>
                                      <TableCell>
                                        <Media
                                          object
                                          width="200em"
                                          height="200em"
                                          src={
                                            "data:image/jpeg;base64," +
                                            base64String
                                          }
                                          alt="Card Image"
                                        />
                                      </TableCell>
                                      <TableCell> {item.ownerName}</TableCell>
                                      <TableCell>${item.price}</TableCell>
                                      <TableCell>${item.depositFee}</TableCell>
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

                <GridItem align="right">
                  <b>Total Price: ${this.props.location.state.booking.price}</b>
                  {/* placeholder */}
                  <br />
                  <br />
                </GridItem>

                <GridItem>
                  <DoctorMapContainer />
                  <br />
                  <br />
                </GridItem>
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
export default withStyles(productPageStyle)(IndBooking);
