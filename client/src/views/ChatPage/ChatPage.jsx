import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import cartPageStyle from "assets/jss/material-kit-react/views/cartPage.jsx";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";

//for chat
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import ChatBackend from "../Components/ChatBackend.js";
import TextField from "@material-ui/core/TextField";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Face from "@material-ui/icons/Face";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import uuid from "uuid";

import firebase from "firebase";

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writeMessage: "",
      message: [],
      isLoaded: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn"))
    };
  }

  sendMessage() {
    console.log("sendMessage RAN");
    if (this.state.writeMessage === "") return;
    let messageToSend = {
      user: {
        _id: 1,
        email: firebase.auth().currentUser.email
      },
      timestamp: new Date(),
      _id: uuid.v4(),
      text: this.state.writeMessage
    };
    let dbref = firebase.auth().currentUser.email.split("@")[0];
    firebase
      .database()
      .ref(dbref)
      .push(messageToSend);
    this.setState({ writeMessage: "" });
  }

  append(currentMessages = [], messages, inverted = false) {
    console.log("append RAN");
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    return inverted
      ? messages.concat(currentMessages)
      : currentMessages.concat(messages);
  }

  firstScroll = false;
  handleOpen = callback => {
    console.log("handleOpen RAN");
    this.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: this.append(previousState.messages, message)
        };
      });
    });
  };

  loadMessages(callback) {
    console.log("loadMessages RAN");
    let dbRef = firebase
      .database()
      .ref(firebase.auth().currentUser.email.split("@")[0]);
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        timestamp: new Date(message.timestamp),
        user: {
          _id: message.user._id,
          email: message.user.email
        }
      });

      dbRef.on("value", onReceive());
      console.log("loadMessages ENDED");
    };
  }

  setMessages(newMessages) {
    this.setState({
      messages: newMessages
    });
  }

  componentDidMount() {
    this.handleOpen();
    console.log("componentDidMount RAN");
    if (
      firebase.auth().currentUser !== null &&
      firebase.auth().currentUser !== ""
    ) {
      console.log("firebase auth is not null");
      firebase
        .database()
        .ref(firebase.auth().currentUser.email.split("@")[0])
        .on("value", data => {
          const messages = data.val();
          this.setMessages(messages);
        });
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate RAN");
    this.handleOpen();
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (!this.messageList) return;
    let scrollHeight = this.messageList.scrollHeight;
    let height = this.messageList.clientHeight;
    let maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { classes, ...rest } = this.props;
    let messages = this.state.messages || [];
    console.log("the messages are");
    console.log(messages);

    console.log("in render", this.state.items);
    this.scrollToBottom();
    return (
      <div>
        <Header
          brand="EVENTA"
          rightLinks={<HeaderLinks isLoggedIn={this.state.isLoggedIn} />}
          fixed
          color="white"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/desk.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <h4 className={classes.title}>Chat with us</h4>
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
                  tabName: "Chatroom",
                  tabIcon: Face,
                  tabContent: (
                    <div
                      style={{
                        color: "#000000",
                        fontSize: 60,
                        width: 1000,
                        height: 700,
                        alignContent: "center",
                        justifyContent: "center",
                        backgroundColor: "#ffffff"
                      }}
                    >
                      <h2>Chat With Us Now!</h2>
                      <div
                        style={{ paddingLeft: 5, paddingTop: 15, fontSize: 16 }}
                      >
                        <div>Speak your mind! :)</div>
                        <br />
                      </div>

                      <div
                        style={{
                          color: "primary",
                          fontSize: 25,
                          overflow: "auto",
                          height: "70%",
                          width: "100%",
                          outline: "solid",
                          outlineWidth: "1px"
                        }}
                        ref={div => {
                          this.messageList = div;
                        }}
                      >
                        {Object.values(messages).map((message, i) => {
                          const username = message.user.email.split("@")[0];
                          const text = message.text;
                          return (
                            <div className="chatCus" style={{ padding: 5 }}>
                              <div>
                                {username}: {text}
                              </div>
                              <div style={{ fontSize: "10px" }}>
                                {new Date().toString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <TextField
                          onKeyPress={ev => {
                            //console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === "Enter") {
                              // Do code here
                              this.sendMessage();
                              ev.preventDefault();
                            }
                          }}
                          id="writeMessage"
                          label="Type your message here..."
                          value={this.state.writeMessage}
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={e => {
                            this.setState({ writeMessage: e.target.value });
                          }}
                          margin="normal"
                          style={{ width: 600 }}
                        />
                        <Button
                          color="primary"
                          style={{}}
                          onClick={() => {
                            this.sendMessage();
                          }}
                        >
                          Send
                        </Button>
                        <br />
                      </div>
                      <br />
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withStyles(cartPageStyle)(ChatPage);
