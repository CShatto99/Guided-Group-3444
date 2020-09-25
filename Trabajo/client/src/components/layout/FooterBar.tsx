import * as React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Nav } from "reactstrap";
import "./layoutStyles.css";

/* Interface for defining props for landing page
 */
interface FooterBarProps {
    
}

/* Interface for defining state for landing page
 */
interface FooterBarState {

}

/* The FooterBar is the black bar shown at the bottom of all web pages */
export class FooterBar extends React.Component<FooterBarProps, FooterBarState> {
    render() {
        return (
            <Navbar className={"footerBar"}>
                <Nav vertical>
                    <NavItem>
                        <Link className={"footerLink"} to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link className={"footerLink"} to="/companies">Companies</Link>
                    </NavItem>
                    <NavItem>
                        <Link className={"footerLink"} to="/contact">Contact Us</Link>
                    </NavItem>
                    <NavItem>
                        <span className={"footerLink"} >© Guided Group</span>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}
