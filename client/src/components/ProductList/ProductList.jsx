import React from "react";
import {CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, Row } from "reactstrap";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import image1 from "assets/img/bouquet.jpg";
import image2 from "assets/img/love.jpg";
import image3 from "assets/img/photobooth.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import cardStyle from "assets/jss/material-kit-react/components/cardStyle.jsx";

const ProductList = (props) => {
  return (
    <row>
        <CardGroup>
            <Card max-width = "50%">
            <CardImg top width="100%" src={image1} alt="Card image cap" />
            <CardBody>
                <CardTitle>Pink and Yellow Bouquet</CardTitle>
                <CardSubtitle>EventCircle</CardSubtitle>
                <Button color = "info">View Details</Button>
                <CardFooter color = "light"> Last updated 3 mins ago </CardFooter>
            </CardBody>
            </Card>
            <br></br>
            <Card max-width = "50%">
            <CardImg top width="100%" src={image2} alt="Card image cap" />
            <CardBody>
                <CardTitle>Love Ornament</CardTitle>
                <CardSubtitle>EventSquare</CardSubtitle>
                <Button color = "info">View Details</Button>
                <CardFooter color = "light"> Last updated 3 mins ago </CardFooter>
            </CardBody>
            </Card>
            <br></br>
            <Card max-width = "50%">
            <CardImg top width="100%" src={image3} alt="Card image cap" />
            <CardBody>
                <CardTitle>Photobooth Backdrop</CardTitle>
                <CardSubtitle>EventCircle</CardSubtitle>
                <Button color = "info">View Details</Button>
                <CardFooter color = "light"> Last updated 3 mins ago </CardFooter>
            </CardBody>
            </Card>
            <br></br>
        </CardGroup>
    </row>
  );
};

export default withStyles (cardStyle)(ProductList);