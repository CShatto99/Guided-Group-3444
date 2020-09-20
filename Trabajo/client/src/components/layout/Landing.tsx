import * as React from "react";
import { Button } from "reactstrap";
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

export class Landing extends React.Component<LandingProps, LandingState> {

    //constructor
    constructor(props: LandingProps) {
        super(props);

        //any other setup should go here
    }

    render() {
        return (
            <TopNavBar/>
        )
    }
}

