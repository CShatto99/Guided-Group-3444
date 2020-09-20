import * as React from "react";

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
            <h1>This is a test</h1>
        )
    }
}

