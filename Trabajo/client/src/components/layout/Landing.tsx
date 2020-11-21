import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { RootState } from "../../store";
import { UserState } from "../../store/user";
import "../../css/landing.css";
import carpool from "../../img/carpool.png";
import greenLeaf from "../../img/greenLeaf.png";
import calendar from "../../img/calendar.png";
import mapMarker from "../../img/mapmarker.png";

/* The landing page is the site home page - this is what displays when users visit
    our website.  It provides generic info about our application.
    */
const LandingRef: React.FC<{}> = () => {
  //redux state
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);

  return isAuth ? (
    <Redirect push to="/userHome" />
  ) : (
    <>
      <div className="header-img">
        <h1 className="titleHeader">Trabajo</h1>
        <h1 className="subtitleHeader">
          A ride-share solution for going to and from work
        </h1>
        <Link className="hero-btn" to="/register">
          Get Started
        </Link>
      </div>
      <Row className="landing-container">
        <Col xs="12">
          <Row xs="12" className="landing-section justify-content-around">
            <Col xs="12" lg="5" className="left-child">
              <img src={carpool} alt="Carpool" />
            </Col>
            <Col xs="12" lg="5" className="landing-text">
              <div>
                <h3>Why Trabajo?</h3>
                <p>
                  Services like Uber and Lyft are broad in that virtually anyone
                  can sign up to be a driver and drive anyone where they would
                  like to go. But it is not likely that passengers would be
                  willing to share the same ride if they are strangers and going
                  to different destinations. Yet, what if the passengers were
                  not strangers and they all had to travel to the same place?
                  What if there was a similar application that allowed employees
                  to carpool/share rides to their workplaces? That is where
                  Trabajo comes in.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs="12">
          <Row xs="12" className="landing-section justify-content-around">
            <Col xs="12" lg="5" className="left-child landing-text">
              <div>
                <h3>Eco Friendly</h3>
                <p>
                  Trabajo will track how many people you give a ride to and how
                  many miles you save. Keep track of how much you have helped
                  the environment by using Trabajo.
                </p>
              </div>
            </Col>
            <Col xs="12" lg="5">
              <img src={greenLeaf} alt="Green Leaf" />
            </Col>
          </Row>
        </Col>
        <Col xs="12">
          <Row xs="12" className="landing-section justify-content-around">
            <Col xs="12" lg="5" className="left-child">
              <img src={calendar} alt="Green Leaf" />
            </Col>
            <Col xs="12" lg="5" className="landing-text">
              <div>
                <h3>Find a Ride or Drive Others</h3>
                <p>
                  Select what days you would like to ride, what days you would
                  like to drive, and what days you will not be participating in
                  a rideshare. You can either communicate in person at work, or
                  use our built in chatbox to communicate and coordinate rides
                  with other users.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs="12">
          <Row xs="12" className="landing-section justify-content-around">
            <Col xs="12" lg="5" className="landing-text left-child">
              <div>
                <h3>
                  Manually choose riders, or let our system automatically choose
                  your riders
                </h3>
                <p>
                  If you want to only give a specific person a ride, you can
                  select that user from our drive planner. If you would rather
                  just pick up the nearest people to you, Trabajo will select
                  the nearest people to you.
                </p>
              </div>
            </Col>
            <Col xs="12" lg="5">
              <img src={mapMarker} alt="Green Leaf" />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LandingRef;
