import React, { useState } from "react";
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
    TODO: edit to show different buttons according to whether the user is logged in or not.*/
export const TopNavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector<RootState, UserState>(
    state => state.user
  );
  const [isOpen, setIsOpen] = useState(false);

  const userLogout = () => {
    dispatch(logout());
  };

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
        <Button className={"navButton"} onClick={userLogout}>
          Logout
        </Button>
      </NavItem>
    </>
  );

  return (
    <div className={"topNavBar"}>
      <Navbar expand="md">
        <NavbarBrand href="/" className="nav-logo">
          <i className="fa fa-suitcase" aria-hidden="true"></i>
          {isAuth && `Welcome ${user.fullName}!`}
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
