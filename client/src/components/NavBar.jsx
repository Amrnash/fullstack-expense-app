import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../actions";
const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const username = useSelector((state) => state.auth.user.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("persist:root");
    history.replace("/login");
    dispatch(loggedOut());
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Expense App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <NavDropdown
                title={`welcome ${username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavBar };
