/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Head>
        <title>Sign In Roster</title>
        <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet" />
      </Head>
      <div
        className="signin-content-container"
      >
        <h1 className="signin-title">WELCOME!</h1>
        <img className="signin-img" src="https://www.svgrepo.com/show/494520/air-cloud-brain.svg" alt="cloud" />
        <Button type="button" size="lg" className="signin-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </>
  );
}

export default Signin;
