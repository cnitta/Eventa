import firebase from "firebase";

class ChatBackend {

  uid = "";
  messagesRef = null;
  username = "";
  constructor() {}

  authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
        this.setUsername(user.email.split("@")[0]);
      }
    });
  }
  setUsername(username){
      this.username = username;
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  
  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref("customermessages" + this.username)
    const onReceive = data => {
      // console.log("dada", data.val());
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        username: message.author,
      });
    };
    this.messagesRef.on("child_added", onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      // console.log(message);
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new ChatBackend();
