import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Announcement from "@material-ui/icons/Announcement";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Carousel from "components/Carousel/SectionCarousel.jsx"
import Button from "components/CustomButtons/Button.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={10} sm={12} md={8}>
            <h2 className={classes.title}>Let's talk EVENTA</h2>
            <h5 className={classes.description}>            
                Let us take the hassle out of your event planning by helping you to manage the logistics of event supplies. You can then focus on planning your event, regardless of whether you know what items to rent, or not.
            </h5>
            <Button
              color="success"
              size="lg"
              href="/product-page"
              rel="noopener noreferrer"
            >
            <i className="fas fa-play" />I know what I want
            </Button>

            <Button
              color="danger"
              size="lg"
              onClick={this.props.handleClick}
              target="_blank"
              rel="noopener noreferrer"
            >
            <i className="fas fa-play" />I don't know what I want
            </Button>

          </GridItem>
        </GridContainer>
        <div>
          <Carousel>
          <div>
          <GridItem>
              <h2 className={classes.title}>Featured Items</h2>
          </GridItem>
                    <img
                      src="assets/img/bouquet.jpg"
                      alt="First slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        National Park, United States
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src="assets/img/bg.jpg"
                      alt="Second slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        United States
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src="assets/img/bg.jpg"
                      alt="Third slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        National Park, United States
                      </h4>
                    </div>
                  </div>
          </Carousel>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Entirely Localised"
                description="We go to where you are, to where you need your event supplies to be at. We will clear the items for you, once your event is completed."
                icon={LocationOn}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Verified Partners"
                description="Be assured that all partners are personally verified by EVENTA and enjoy secure rentals with a peace of mind."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Live Product Tracking"
                description="Everyone loves knowing the whereabout of their purchases and we are all for transparency of our deliveries."
                icon={Announcement}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
