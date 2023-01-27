/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import Head from 'next/head';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap" rel="stylesheet" />

      </Head>
      <div className="nav-bar-container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navBar">
          <Container>
            <Link passHref href="/">
              <img className="nav-title" src="https://cdn-icons-png.flaticon.com/512/1427/1427803.png" alt="teamwork" />
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
                <Link passHref href="/">
                  <Nav.Link className="nav-link">Home</Nav.Link>
                </Link>
                <Link passHref href="/publicTeams">
                  <Nav.Link className="nav-link"> Public Teams</Nav.Link>
                </Link>
                <Link passHref href="/teams">
                  <Nav.Link className="nav-link"> My Teams</Nav.Link>
                </Link>
                <Link passHref href="/newteams">
                  <Nav.Link className="nav-link">Create Team</Nav.Link>
                </Link>
                <Link passHref href="/new">
                  <Nav.Link className="nav-link">Create Member</Nav.Link>
                </Link>
                <Link passHref href="/">
                  <Button className="nav-bar-signout" onClick={signOut}>Sign Out</Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
