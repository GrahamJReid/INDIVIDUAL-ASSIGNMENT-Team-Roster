/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <div className="nav-bar-container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navBar">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand className="nav-title">Team Central</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <Link passHref href="/">
                <Nav.Link className="nav-link">Home</Nav.Link>
              </Link>
              <Link passHref href="/teams">
                <Nav.Link className="nav-link">Teams</Nav.Link>
              </Link>
              <Link passHref href="/newteams">
                <Nav.Link className="nav-link">Create Team</Nav.Link>
              </Link>
              <Link passHref href="/new">
                <Nav.Link className="nav-link">Add A Member</Nav.Link>
              </Link>
              <Link passHref href="/">
                <Button className="nav-bar-signout" onClick={signOut}>Sign Out</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
