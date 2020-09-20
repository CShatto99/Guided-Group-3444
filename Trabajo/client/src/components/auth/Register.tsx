import * as React from "react";

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
            <p>FILL ME WITH REGISTRATION</p>
        );
    }
}