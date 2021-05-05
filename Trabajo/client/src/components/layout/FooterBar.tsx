import * as React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Nav } from "reactstrap";
import "../../css/layoutStyles.css";
import "../../css/footerBar.css";

// Interface for defining props for landing page
interface FooterBarProps {}

/* The FooterBar is the black bar shown at the bottom of all web pages. It
 * provides links to the landing page and a form to contact us with questions.
 */
export const FooterBar: React.FC<FooterBarProps> = () => {
  return (
    <Navbar className="footerBar">
      <Nav className="footer-nav">
        <NavItem>
          <Link className="footerLink" to="/">
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link className="footerLink" to="/contact">
            Contact Us
          </Link>
        </NavItem>
        <NavItem>
          <span className="footerLink">© Guided Group</span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
