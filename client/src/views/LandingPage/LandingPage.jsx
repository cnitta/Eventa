import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// Recommend Section
import styles from "assets/css/EventaSS.css";
import styles1 from "react-input-range/lib/css/index.css";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputRange from "react-input-range";

// Core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";

// react components for routing our app without refresh
import { Redirect, Link } from "react-router-dom";

// Handle page scrolling
import scrollToComponent from "react-scroll-to-component";
import firebase from "firebase";

// Import Image for Recommend Section
import event1 from "assets/img/eventa/bouquet-celebration-color-169190.jpg";

const dashboardRoutes = [];

//For Firebase connection for chat & maps
var config = {
  apiKey: "AIzaSyBWtK5hlKFVvmMpdRKADZRtOUhF8awZwBU",
  authDomain: "delivery-9b946.firebaseapp.com",
  databaseURL: "https://delivery-9b946.firebaseio.com",
  projectId: "delivery-9b946",
  storageBucket: "delivery-9b946.appspot.com",
  messagingSenderId: "727628962882"
};

firebase.initializeApp(config);

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      open: false,
      selectedEvent: "",
      people: 0,
      redirect: false,
      value5: { min: 1, max: 100 }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePeople = this.handlePeople.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedEvent: event.target.value });
    console.log("selected event is " + event.target.value);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePeople(e) {
    this.setState({ people: e.target.value });
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }
  handleClick() {
    scrollToComponent(this.RecommendSection, {
      offset: 0,
      align: "middle",
      duration: 1000,
      ease: "outCirc"
    });
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      console.log(this.state.selectedEvent);
      let tempSelectedEvent = this.state.selectedEvent;
      this.setState({
        selectedEvent: ""
      });
      return (
        <Redirect
          to={{
            pathname: "/product-page",
            state: { item: tempSelectedEvent }
          }}
        />
      );
    }

    return (
      <div>
        <Header
          routes={dashboardRoutes}
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
        <Parallax image={require("assets/img/birthday.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>
                  You'd never have to manage your event logistics again
                </h1>
                <h3 className={classes.subtitle}>
                  We are EVENTA. We like parties. We don't like the dirty work
                  behind them. We believe in empowering you to be the life of
                  the party. Leave the rest to us.
                </h3>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection handleClick={this.handleClick.bind(this)} />
          </div>
          <div
            className="recommendSection"
            ref={section => {
              this.RecommendSection = section;
            }}
          >
            <div className={classes.section}>
              <Grid>
                <div className="relative container">
                  <img src={event1} alt={"birthday event"} />
                  <div className="absolute zindex-more">
                    <GridContainer>
                      <div className={classes.typo}>
                        <h1 className={classes.title}>Let us help you</h1>
                        <br />
                        <h2>to get the right things for the right event</h2>
                        <Button type="button" onClick={this.handleClickOpen}>
                          What event are you planning?
                        </Button>
                        <Dialog
                          disableBackdropClick
                          disableEscapeKeyDown
                          open={this.state.open}
                          onClose={this.handleClose}
                        >
                          <DialogTitle>
                            Tell us more about your event
                          </DialogTitle>
                          <DialogContent>
                            <form className={classes.container}>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">
                                  Event:
                                </InputLabel>
                                <Select
                                  native
                                  value={this.state.selectedEvent}
                                  onChange={this.handleChange}
                                  input={<Input id="age-native-simple" />}
                                >
                                  <option value="" />
                                  <option value={"Birthday Celebration"}>
                                    Birthday Celebration
                                  </option>
                                  <option value={"Wedding"}>Wedding</option>
                                  <option value={"Picnic"}>Picnic</option>
                                  <option value={"Family Gathering"}>
                                    Family Gathering
                                  </option>
                                  <option value={"Theme Event"}>
                                    Theme Event
                                  </option>
                                </Select>
                                <p style={{ color: "black" }}>Budget:</p>
                                <InputRange
                                  draggableTrack
                                  maxValue={100}
                                  minValue={1}
                                  onChange={value =>
                                    this.setState({ value5: value })
                                  }
                                  onChangeComplete={value => console.log(value)}
                                  value={this.state.value5}
                                />
                              </FormControl>
                            </form>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleSubmit}>Ok</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </GridContainer>
                  </div>
                </div>
              </Grid>
            </div>
          </div>

          <div className={classes.container}>
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
