import * as React from "react";
import { Navbar, Button, NavbarBrand, NavItem, Nav } from "reactstrap";
import "./layoutStyles.css";

/* Interface for defining props for landing page
 */
interface TopNavBarProps {
    
}

/* Interface for defining state for landing page
 */
interface TopNavBarState {

}

/* This class is the top navigation bar shown on all web pages.  
    TODO: edit to show different buttons according to whether the user is logged in or not.*/
export class TopNavBar extends React.Component<TopNavBarProps, TopNavBarState> {

    //constructor
    constructor(props: TopNavBarProps) {
        super(props);

        //any other setup should go here
    }

    render() {
        return (
            <div className={"topNavBar"}>
                <Navbar>
                    <NavbarBrand href="/">Logo will go here</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Button className={"navButton"} href="/login" size="lg">Login</Button>
                        </NavItem>
                        <NavItem>
                            <Button className={"navButton"} href="/register" size="lg">Register</Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}
