import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Button,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
} from "reactstrap";
import "./layoutStyles.css";
import { RootState } from "../../store";
import { logout, UserState } from "../../store/user";

// Interface for defining props for landing page
interface TopNavBarProps {}

/* This function is the top navigation bar shown on all web pages.
 * The buttons that are shown depend on if the user is logged in or not.
 */
export const TopNavBar: React.FC = () => {
  //redux state variables
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector<RootState, UserState>(
    state => state.user
  );

  //component state variables
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(user.fullName);
  }, [isAuth]);

  /* Function: userLogout
   * Parameters: void
   * Return: void
   * Purpose:  Called when the user clicks logout and calls the
   *           redux function logout to update the state of the
   *           application and remove token from API.
   */
  const userLogout = () => {
    //call redux logout
    dispatch(logout());
  };

  //links to display when the user is not logged in
  const guestLinks = (
    <>
      <NavItem>
        <Button className={"navButton"} href="/login">
          Login
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/register">
          Register
        </Button>
      </NavItem>
    </>
  );

  //links to display if the user is logged in
  const authLinks = (
    <>
      <NavItem>
        <Button className={"navButton"} href="/userHome">
          Home
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/userHome/updateProfile">
          Update Profile
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} href="/userHome/updateUserCompany">
          Update Company
        </Button>
      </NavItem>
      <NavItem>
        <Button className={"navButton"} onClick={userLogout}>
          Logout
        </Button>
      </NavItem>
    </>
  );

  console.log(user);

  //return the html objects depending on if the user is logged in or not.
  //collapsable - if isOpen is true then it is collapsed, otherwise it is not.
  return (
    <div className={"topNavBar"}>
      <Navbar expand="md">
        <NavbarBrand href="/" className="nav-logo">
          <i className="fa fa-suitcase" aria-hidden="true"></i>
          {`Welcome ${user.fullName}!`}
        </NavbarBrand>
        {isOpen ? (
          <i
            aria-label="Toggle navigation"
            className="fa fa-times fa-2x nav-icon"
            aria-hidden="true"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
        ) : (
          <i
            aria-label="Toggle navigation"
            className="fa fa-bars fa-2x nav-icon"
            aria-hidden="true"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
        )}

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuth ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
