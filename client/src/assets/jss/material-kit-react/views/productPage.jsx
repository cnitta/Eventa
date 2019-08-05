import { container, title } from "assets/jss/material-kit-react.jsx";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.jsx";

const productPageStyle = {
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
    margin: "10px 0 0"
  },
  producttitle: {
    fontSize: "48px",
    color: "black",
    lineHeight: "40px",
    margin: "5px 0 0"
  },
  productspecs: {
    fontSize: "18px",
    color: "black"
  },
  productsubtitle: {
    fontsize: "32px",
    color: "grey",
    margin: "5px 0 0"
  },
  price: {
    fontSize: "32px",
    fontWeight: "150px",
    color: "#E75480",
    margin: "5px 0 0"
  },
  description: {
    fontSize: "16px",
    fontWeight: "100",
    LineHeight: "1.5",
    PaddingRight: "30px",
    color: "black",
    opacity: ".6"
  },
  num: {
    borderRadius: "15px",
    padding: "10px"
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
  }
};

export default productPageStyle;
