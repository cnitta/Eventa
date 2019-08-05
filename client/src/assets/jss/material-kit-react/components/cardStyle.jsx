const cardStyle = {

  ProductList:{
    maxWidth: "100px",
    flexDirection: "row"    
  },

  card: {
    border: "5",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
    transition: "all 300ms linear"
  },
  cardPlain: {
    background: "transparent",
    boxShadow:
    "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
  },
  /* On mouse-over, add a deeper shadow */
  cardHover: {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  },

  cardCarousel: {
    overflow: "hidden"
  }
};

export default cardStyle;
