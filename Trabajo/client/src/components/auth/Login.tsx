import * as React from "react";

/* Interface for defining props for Login page
 */
interface LoginProps {

}

/* Interface for defining the State of the Login page 
 */
interface LoginState {

}

export class Register extends React.Component<LoginProps, LoginState> {
    
    //constructor
    constructor(props: LoginProps) {
        super(props);
    }

    render() {
        return (
            <p>FILL ME WITH LOGS OF IN</p>
        );
    }
}