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

export class TopNavBar extends React.Component<TopNavBarProps, TopNavBarState> {

    //constructor
    constructor(props: TopNavBarProps) {
        super(props);

        //any other setup should go here
    }

    render() {
        return (
            <Navbar>
                <NavbarBrand href="/">Trabajo</NavbarBrand>
                <Nav>
                    <NavItem>
                        <Button className={"navButton"} href="/login">Login</Button>
                    </NavItem>
                    <NavItem>
                        <Button className={"navButton"} href="/register">Register</Button>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}
