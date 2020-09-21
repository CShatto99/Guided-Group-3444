import * as React from "react";
import { Button } from "reactstrap";
import { FooterBar } from "./FooterBar";
import "./layoutStyles.css";
import { TopNavBar } from "./TopNavBar";

/* Interface for defining props for landing page
 */
interface LandingProps {
    
}

/* Interface for defining state for landing page
 */
interface LandingState {

}

/* The landing page is the site home page - this is what displays when users visit
    our website.  
    */
export class Landing extends React.Component<LandingProps, LandingState> {

    //constructor
    constructor(props: LandingProps) {
        super(props);

        //any other setup should go here
    }

    render() {
        return (
            <div>
                <TopNavBar/>
                <div className={"mainContentArea"}>
                    <h1 className={"titleHeader"}>Trabajo</h1>
                </div>
                <FooterBar/>
            </div>
        )
    }
}

