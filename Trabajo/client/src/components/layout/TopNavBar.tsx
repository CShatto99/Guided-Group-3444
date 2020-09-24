import * as React from "react";
import { useSelector } from "react-redux";
import { Navbar, Button, NavbarBrand, NavItem, Nav } from "reactstrap";
import "./layoutStyles.css";
import { RootState } from "../../store";
import { UserState } from "../../store/user";

/* Interface for defining props for landing page
 */
interface TopNavBarProps {}

/* Interface for defining state for landing page
 */
interface TopNavBarState {}

/* This function is the top navigation bar shown on all web pages.  
    TODO: edit to show different buttons according to whether the user is logged in or not.*/
export const TopNavBar: React.FC = () => {
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);

  console.log(isAuth);

  const guestLinks = (
    <>
      <NavItem>
        <Button className={"navButton"} href="/Companies" size="lg">
          Companies
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/login" size="lg">
          Login
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/register" size="lg">
          Register
        </Button>
      </NavItem>
    </>
  );

  const authLinks = (
    <>
      <NavItem>
        <Button className={"navButton"} href="/" size="lg">
          Home
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/" size="lg">
          Other
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/" size="lg">
          Other 2
        </Button>
      </NavItem>
    </>
  );

  return (
    <div className={"topNavBar"}>
      <Navbar>
        <NavbarBrand href="/">Logo will go here</NavbarBrand>
        <Nav>{isAuth ? authLinks : guestLinks}</Nav>
      </Navbar>
    </div>
  );
};
