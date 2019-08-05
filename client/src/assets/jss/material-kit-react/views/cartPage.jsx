import { container } from "assets/jss/material-kit-react.jsx";

const cartStyle = {
  container: {
    zIndex: "12",
    ...container
  },
  brand: {
    color: "#FFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    color: "white",
    display: "inline-block",
    position: "relative"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
    textShadow: "2px 2px 4px #000000"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  table: {
    minWidth: 700
  },
  paper: {
    textAlign: "center"
  },
  chatCus: {
    textAlign: "right"
  }
};

export default cartStyle;
