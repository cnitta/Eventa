import React from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import image from "assets/img/banquet.jpg";
import firebase from "firebase";
import Swal from 'sweetalert2';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    // set the initial component state
    this.state = {
      cardAnimaton: "cardHidden",
      errors: {},
      user: {
        email: "",
        password: ""
      },
      redirect: false
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/landing-page",
            isLoggedIn: true
          }}
        />
      );
    }

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="EVENTA"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <p className={classes.divider}>
                      <b>Welcome to EVENTA!</b>
                      <br />
                      Please login to continue.
                    </p>
                    <CardBody>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="lg"
                            onClick={() => {
                              // Create a string for an HTTP body message
                              const email = document.getElementById("email")
                                .value;
                              const password = document.getElementById("pass")
                                .value;
                              const formData = `{"email": "${email}", "password": "${password}"}`;
                              const url =
                                "http://localhost:5000/api/users/login";

                              // Fetch API request
                              // Call the fetch function passing the url of the API as a parameter
                              fetch(url, {
                                method: "POST",
                                body: formData,
                                headers: {
                                  "Content-type":
                                    "application/json; charset=utf-8"
                                },
                                credentials: "include"
                              })
                                .then(response => response.json())
                                .then(
                                  function(response) {
                                    // Your code for handling the data you get from the API
                                    if (response.success) {
                                      console.log(response);
                                      console.log(email);
                                      console.log(password);
                                      console.log("LOGIN SUCCESS");
                                      firebase
                                        .auth()
                                        .signInWithEmailAndPassword(
                                          email,
                                          password
                                        )
                                        .catch(function(error) {
                                          firebase
                                            .auth()
                                            .createUserWithEmailAndPassword(
                                              email,
                                              password
                                            )
                                            .catch(error => {
                                              console.log(
                                                "cannot create account!"
                                              );
                                            });
                                        });
                                      // Put UserId into Local Storage
                                      localStorage.setItem("loggedInUserId", JSON.stringify(response.session.userId));
                                      console.log(JSON.parse(localStorage.getItem("loggedInUserId")));

                                      // Set loggedIn localStorage variable to True
                                      localStorage.setItem("isLoggedIn", JSON.stringify("true"));
                                      console.log(JSON.parse(localStorage.getItem("isLoggedIn")));

                                      // Login success, redirect to landing page
                                      this.setState({ redirect: true });
                                    } else {
                                      console.error(response);
                                      console.log(email);
                                      console.log(password);
                                      console.log("LOGIN FAILURE");

                                      // Show error message on login failure
                                      Swal(
                                        'Login Failed',
                                        'Invalid username or password. Please try again.',
                                        'error'
                                      )
                                    }
                                  }.bind(this)
                                );
                            }}
                          >
                            Login
                          </Button>

                          {/* <Button
                            variant="contained"
                            color="primary"
                            size="lg"
                            onClick={() => {
                              // Create a string for an HTTP body message
                              const email = "bobbytan@gmail.com";
                              const password = "1234567";
                              const formData = `{"email": "${email}", "password": "${password}"}`;
                              const url =
                                "http://localhost:5000/api/users/login";

                              // Fetch API request
                              // Call the fetch function passing the url of the API as a parameter
                              fetch(url, {
                                method: "POST",
                                body: formData,
                                headers: {
                                  "Content-type":
                                    "application/json; charset=utf-8"
                                },
                                credentials: "include"
                              })
                                .then(response => response.json())
                                .then(
                                  function(response) {
                                    // Your code for handling the data you get from the API
                                    if (response.success) {
                                      console.log(response);
                                      console.log(email);
                                      console.log(password);
                                      console.log("LOGIN SUCCESS");
                                      firebase
                                        .auth()
                                        .signInWithEmailAndPassword(
                                          email,
                                          password
                                        )
                                        .catch(function(error) {
                                          firebase
                                            .auth()
                                            .createUserWithEmailAndPassword(
                                              email,
                                              password
                                            )
                                            .catch(error => {
                                              console.log(
                                                "cannot create account!"
                                              );
                                            });
                                        });
                                      // Put UserId into Local Storage
                                      localStorage.setItem("loggedInUserId", JSON.stringify(response.session.userId));
                                      console.log(JSON.parse(localStorage.getItem("loggedInUserId")));

                                      // Set loggedIn localStorage variable to True
                                      localStorage.setItem("isLoggedIn", JSON.stringify("true"));
                                      console.log(JSON.parse(localStorage.getItem("isLoggedIn")));

                                      // Login success, redirect to landing page
                                      this.setState({ redirect: true });
                                    } else {
                                      console.error(response);
                                      console.log(email);
                                      console.log(password);
                                      console.log("LOGIN FAILURE");

                                      // Show error message on login failure
                                      alert(
                                        "Invalid username or password. Please try again."
                                      );
                                    }
                                  }.bind(this)
                                );
                            }}
                          >
                            Test Buyer
                          </Button> */}
                        </div>
                        <div>
                          <Button
                            simple
                            color="primary"
                            size="lg"
                            href="/signup-page"
                          >
                            Not yet registered with us?
                            <br />
                            Click here to Sign Up!
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);

{
  /* Previous Login Authentication Code (For Reference)
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="lg" 
                        onClick={() => {
                          // Create a string for an HTTP body message
                          const email = document.getElementById('email').value;
                          const password = document.getElementById('pass').value;
                          const formData = `{"email": "${email}", "password": "${password}"}`;

                          // Create an AJAX request
                          const xhr = new XMLHttpRequest();
                          xhr.open('post', '/api/users/login', true);
                          xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                          xhr.onload = function () {
                            var userResponse = JSON.parse(xhr.responseText);
                            if (xhr.status === 200) {
                              console.log(userResponse);
                              console.log(email);
                              console.log(password);
                              console.log("LOGIN SUCCESS");

                              this.setState({ redirect:true });
                            } else {
                              console.error(userResponse);
                              console.log(email);
                              console.log(password);
                              console.log("LOGIN FAILURE");

                              // Show error message on login failure
                              alert("Invalid username or password. Please try again.");
                            }
                          }.bind(this);
                          xhr.send(formData);
                        }}
                      >
                        Login
                      </Button> */
}
