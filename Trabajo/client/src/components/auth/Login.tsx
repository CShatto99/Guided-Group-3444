import * as React from "react";
import { TopNavBar } from "../layout/TopNavBar";

/* Interface for defining props for Login page
 */
interface LoginProps {

}

/* Interface for defining the State of the Login page 
 */
interface LoginState {

}

export class Login extends React.Component<LoginProps, LoginState> {
    
    //constructor
    constructor(props: LoginProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopNavBar/>
                <h1>FILL ME WITH LOGS OF IN</h1>
            </div>
        );
    }
}