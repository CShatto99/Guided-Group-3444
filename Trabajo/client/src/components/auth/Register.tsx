import * as React from "react";
import { FooterBar } from "../layout/FooterBar";
import { TopNavBar } from "../layout/TopNavBar";

/* Interface for defining props for Register page
 */
interface RegisterProps {

}

/* Interface for defining the State of the Register page 
 */
interface RegisterState {

}

/* Register component is the page that presents the user the registration form
*/
export class Register extends React.Component<RegisterProps, RegisterState> {
    
    //constructor
    constructor(props: RegisterProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopNavBar/>
                    <div className={"mainContentArea"}>
                        <h2>FILL ME WITH REGISTRATION</h2>
                    </div>
                <FooterBar/>
            </div>
        );
    }
}