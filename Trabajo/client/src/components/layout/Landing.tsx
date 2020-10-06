import * as React from "react";
import "./layoutStyles.css";

// Interface for defining props for landing page
interface LandingProps {}

/* The landing page is the site home page - this is what displays when users visit
    our website.  
    */
export const Landing: React.FC<LandingProps> = () => {
  return (
    <div className={"mainContentArea"}>
      <h1 className={"titleHeader"}>Trabajo</h1>
      <h1 className={"subtitleHeader"}>
        A ride-share solution for going to and from work
      </h1>
      <div className={"landingInfo"}>
        <img
          src="/images/carpool.png"
          alt="carpoolIcon"
          className={"landingImages"}
        />
        <div className={"textBoxInfo"}>
          <h3>Why Trabajo?</h3>
          <p>
            Services like Uber and Lyft are broad in that virtually anyone can
            sign up to be a driver and drive anyone where they would like to go.
            But it is not likely that passengers would be willing to share the
            same ride if they are strangers and going to different destinations.
            Yet, what if the passengers were not strangers and they all had to
            travel to the same place? What if there was a similar application
            that allowed employees to carpool/share rides to their workplaces?
            That is where Trabajo comes in.
          </p>
        </div>
      </div>
      <div className={"landingInfo"}>
        <div className={"textBoxInfo"}>
          <h3>Eco Friendly</h3>
          <p>
            Trabajo will track how many people you give a ride to and how many
            miles you save. Keep track of how much you have helped the
            environment by using Trabajo.
          </p>
        </div>
        <img
          src="/images/greenLeaf.png"
          alt="ecoIcon"
          className={"landingImages"}
        />
      </div>
      <div className={"landingInfo"}>
        <img
          src="/images/calendar.png"
          alt="calendarIcon"
          className={"landingImages"}
        />
        <div className={"textBoxInfo"}>
          <h3>Find a Ride or Drive Others</h3>
          <p>
            Select what days you would like to ride, what days you would like to
            drive, and what days you will not be participating in a rideshare.
            You can either communicate in person at work, or use our built in
            chatbox to communicate and coordinate rides with other users.
          </p>
        </div>
      </div>
      <div className={"landingInfo"}>
        <div className={"textBoxInfo"}>
          <h3>
            Manually choose riders, or let our system automatically choose your
            riders
          </h3>
          <p>
            If you want to only give a specific person a ride, you can select
            that user from our drive planner. If you would rather just pick up
            the nearest people to you, Trabajo will select the nearest people to
            you.
          </p>
        </div>
        <img
          src="/images/mapmarker.png"
          alt="mapMarkerIcon"
          className={"landingImages"}
        />
      </div>
    </div>
  );
};
