import * as React from "react";
import { FooterBar } from "../layout/FooterBar";
import { TopNavBar } from "../layout/TopNavBar";

/* Interface for defining props for Login page
 */
interface LoginProps {

}

/* Interface for defining the State of the Login page 
 */
interface LoginState {

}

/* Login component is the page that presents the user the login form
*/
export class Login extends React.Component<LoginProps, LoginState> {
    
    //constructor
    constructor(props: LoginProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopNavBar/>
                    <div className={"mainContentArea"}>
                        <h1>FILL ME WITH LOGS OF IN</h1>
                    </div>
                <FooterBar/>
            </div>
        );
    }
}