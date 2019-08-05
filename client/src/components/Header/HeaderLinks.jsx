/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import firebase from 'firebase';
import Swal from 'sweetalert2';


class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,

      redirectHome: false,
      redirectProduct: false,
      redirectCart: false,
      redirectBooking: false,
      redirectChat: false,
      redirectLogout: false,
      cartTooltipNumber: 0
    };
  }
    
  componentDidMount() {
    this.handleCartTooltipUpdate();
  }

  handleRedirectHome() {
    this.setState({ redirectHome: true });
  }

  handleRedirectProduct() {
    this.setState({ redirectProduct: true });
  }

  handleRedirectCart() {
    this.setState({ redirectCart: true });
  }

  handleRedirectBooking() {
    this.setState({ redirectBooking: true });
  }

  handleRedirectChat() {
    this.setState({ redirectChat: true });
  }

  handleRedirectLogout() {
    this.setState({ redirectLogout: true });
    localStorage.clear();
    localStorage.setItem("cartNumberOfItems", JSON.stringify(0));
  }

  handleCartTooltipUpdate() {
    if (localStorage.getItem("cart") === null || typeof(localStorage.getItem("cart")) === undefined) {
      // Set Cart current number of items
      localStorage.setItem("cartNumberOfItems", JSON.stringify(0));
      // Refresh Cart item number via state
      this.setState({ cartTooltipNumber: 0 });
    } else {
      // Set Cart current number of items
      var cartLength = (JSON.parse(localStorage.getItem("cart"))).length;
      localStorage.setItem("cartNumberOfItems", JSON.stringify(cartLength));
      // Refresh Cart item number via state
      this.setState({ cartTooltipNumber: cartLength });
    }
  }
  
  
  render() {
    const { classes, ...rest } = this.props;
    const isLoggedIn = this.state.isLoggedIn;

    if (this.state.redirectHome) {
      this.setState({ redirectHome: false });
      return <Redirect to={{
        pathname: '/landing-page', 
        // isLoggedIn: true
      }}/>
    }

    if (this.state.redirectProduct) {
      this.setState({ redirectProduct: false });
      return <Redirect to={{
        pathname: '/product-page', 
        // isLoggedIn: true
      }}/>
    }

    if (this.state.redirectCart) {
      this.setState({ redirectCart: false });
      return <Redirect to={{
        pathname: '/cart-page', 
        // isLoggedIn: true
      }}/>
    }

    if (this.state.redirectBooking) {
      this.setState({ redirectBooking: false });
      return <Redirect to={{
        pathname: '/booking-page', 
        // isLoggedIn: true
      }}/>
    }

    if (this.state.redirectChat) {
      this.setState({ redirectChat: false });
      return <Redirect to={{
        pathname: '/chat-page', 
        // isLoggedIn: true
      }}/>
    }

    if (this.state.redirectLogout) {
      this.setState({ redirectLogout: false });
      this.handleCartTooltipUpdate();
      // Create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/users/action/logout', true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log("LOGOUT SUCCESS");
        } else {
          console.log("LOGOUT FAILURE");
        }
      }.bind(this);
      xhr.send();
      // Redirect to Landing page on logout success
      Swal(
        'Logged Out!',
        'You have successfully logged out!',
        'success'
      )
      return <Redirect to='/' />
    }


    return (
      <List className={classes.list}>

        {/* Home Button */}
        {isLoggedIn ? (
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => this.handleRedirectHome()}
              color="transparent"
              className={classes.navLink}
            >
              Home
            </Button>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <Button
              href="/landing-page"
              color="transparent"
              className={classes.navLink}
            >
              Home
            </Button>
          </ListItem>
        )}

        {/* Products Button */}
        {isLoggedIn ? (
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => this.handleRedirectProduct()}
              color="transparent"
              className={classes.navLink}
            >
              Products
            </Button>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <Button
              href="/product-page"
              color="transparent"
              className={classes.navLink}
            >
              Products
            </Button>
          </ListItem>
        )}      
        
        {/* Handle Cart Show/Hide Header Button */}
        {isLoggedIn ? (
          <ListItem className={classes.listItem}>
            <Tooltip
            id="cart"
            title={"Current Cart Items: " + this.state.cartTooltipNumber}
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
            >
              <Button
                onClick={() => this.handleRedirectCart()}
                color="transparent"
                className={classes.navLink}
              >
                Cart
              </Button>
            </Tooltip>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <Tooltip
            id="cart"
            title={"Current Cart Items: " + this.state.cartTooltipNumber}
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
            >
              <Button
                href="/login-page"
                color="transparent"
                className={classes.navLink}
              >
                Cart
              </Button>
            </Tooltip>
          </ListItem>
        )}

        {/* Handle Booking Show/Hide Header Button */}
        {isLoggedIn ? (
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => this.handleRedirectBooking()}
              color="transparent"
              className={classes.navLink}
            >
              Bookings
            </Button>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <Button
              href="/login-page"
              color="transparent"
              className={classes.navLink}
            >
              Bookings
            </Button>
          </ListItem>
        )}      

        {/* Handle Chat Page Show/Hide Header Button */}
        {isLoggedIn ? (
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => this.handleRedirectChat()}
              color="transparent"
              className={classes.navLink}
            >
              Chat
            </Button>
          </ListItem>
        ) : (console.log("placeholder"))}      

        {/* Facebook and Instagram Icon Buttons */}
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-facebook"
            title="Follow us on Facebook!"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href="https://www.facebook.com/EventaSingapore"
              target="_blank"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fab fa-facebook"} />
            </Button>
          </Tooltip>
        </ListItem>

        {/* Handle Login/Logout Header Button */}
        {isLoggedIn ? (
          <ListItem className={classes.listItem}>
            <Button              
              onClick={() => this.handleRedirectLogout()}
              color="transparent"
              className={classes.navLink}
            >
              Logout
            </Button>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <Button
              href="/login-page"
              color="transparent"
              className={classes.navLink}
            >
              Login
            </Button>
          </ListItem>
        )}
        
      </List>
        
    );
      
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
