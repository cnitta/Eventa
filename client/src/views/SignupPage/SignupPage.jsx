import React from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
import FormErrors from "views/SignupPage/FormErrors.js";
import Swal from 'sweetalert2';

import image from "assets/img/banquet.jpg";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      redirect: false,
      role: ""
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUserInput(e) {
    const name = e.target.id;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : " is in an invalid format.";
        break;
      case "password":
        passwordValid = value.length >= 7;
        fieldValidationErrors.password = passwordValid
          ? ""
          : " must be at least 7 characters long.";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      return <Redirect to="/login-page" />;
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
                      <h4>Register New Account</h4>
                    </CardHeader>
                    <p className={classes.divider}>
                      Please fill in your particulars below to get started! All
                      fields are required.
                      {/* // Display error message here */}
                      <FormErrors formErrors={this.state.formErrors} />
                    </p>
                    <CardBody>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        value={this.state.email}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          onChange: event => this.handleUserInput(event)
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        value={this.state.password}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "string",
                          onChange: event => this.handleUserInput(event)
                        }}
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="role">Role</InputLabel>
                        <Select
                          value={this.state.role}
                          onChange={this.handleChange}
                          autoWidth="true"
                          inputProps={{
                            name: "role",
                            id: "role"
                          }}
                        >
                          <MenuItem value={"buyer"}>Buyer</MenuItem>
                          <MenuItem value={"seller"}>Seller</MenuItem>
                          <MenuItem value={"driver"}>Driver</MenuItem>
                        </Select>
                      </FormControl>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "string"
                        }}
                      />
                      <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "string"
                        }}
                      />
                      <CustomInput
                        labelText="Address"
                        id="address"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "string"
                        }}
                      />
                      <CustomInput
                        labelText="Postal Code"
                        id="postalCode"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "string"
                        }}
                      />
                      <CustomInput
                        labelText="Contact Number"
                        id="contactNumber"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number"
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="lg"
                        disabled={!this.state.formValid}
                        onClick={() => {
                          // Create a string for an HTTP body message
                          const email = document.getElementById("email").value;
                          const password = document.getElementById("password")
                            .value;
                          const role = this.state.role;
                          const firstName = document.getElementById("firstName")
                            .value;
                          const lastName = document.getElementById("lastName")
                            .value;
                          const address = document.getElementById("address")
                            .value;
                          const postalCode = document.getElementById(
                            "postalCode"
                          ).value;
                          const contactNumber = document.getElementById(
                            "contactNumber"
                          ).value;

                          // Actual Form (Intended Attributes)
                          const formData = `{
                            "email": "${email}", 
                            "password": "${password}", 
                            "role": "${role}", 
                            "name": {"first": "${firstName}","last": "${lastName}"}, 
                            "address": "${address}", 
                            "contact": "${contactNumber}", 
                            "postalCode": "${postalCode}", 
                            "company": "N.A."
                          }`;

                          // Create an AJAX request
                          const xhr = new XMLHttpRequest();
                          xhr.open("post", "/api/users", true);
                          xhr.setRequestHeader(
                            "Content-type",
                            "application/json; charset=utf-8"
                          );
                          xhr.onload = function() {
                            var userResponse = JSON.parse(xhr.responseText);
                            if (xhr.status === 200) {
                              console.log(userResponse);
                              console.log("REGISTRATION SUCCESS");

                              // Redirect to Login page on registration success
                              Swal(
                                'Registration Successful!',
                                'Your account has been created!',
                                'success'
                              )
                              this.setState({ redirect: true });
                            } else {
                              console.error(userResponse);
                              console.log("REGISTRATION FAILURE");

                              // Show error message on registration failure
                              Swal(
                                'Registration Failed',
                                'Invalid value(s) entered. Please try again.',
                                'error'
                              )
                            }
                          }.bind(this);
                          xhr.send(formData);
                        }}
                      >
                        <text>Register Account</text>
                      </Button>
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

export default withStyles(loginPageStyle)(SignupPage);

// Previous password field code - methods

// Imports
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
// import IconButton from '@material-ui/core/IconButton';

// handleChange = prop => event => {
//   this.setState({ [prop]: event.target.value });
// };

// handleClickShowPassword = () => {
//   this.setState(state => ({ showPassword: !state.showPassword }));
// };

// Previous password field code
{
  /* <InputLabel htmlFor="adornment-password">Password</InputLabel>
<Input
  id="adornment-password"
  type={this.state.showPassword ? 'text' : 'password'}
  value={this.state.password}
  onChange={this.handleChange('password')}
  endAdornment={
    <InputAdornment position="end">
      <IconButton
        aria-label="Toggle password visibility"
        onClick={this.handleClickShowPassword}
      >
        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  }
/> */
}
