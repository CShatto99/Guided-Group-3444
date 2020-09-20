import * as React from "react";
import { TopNavBar } from "../layout/TopNavBar";

/* Interface for defining props for Register page
 */
interface RegisterProps {

}

/* Interface for defining the State of the Register page 
 */
interface RegisterState {

}

export class Register extends React.Component<RegisterProps, RegisterState> {
    
    //constructor
    constructor(props: RegisterProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopNavBar/>
                <h2>FILL ME WITH REGISTRATION</h2>
            </div>
        );
    }
}