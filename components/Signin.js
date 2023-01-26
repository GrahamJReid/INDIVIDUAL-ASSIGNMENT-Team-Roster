/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="signin-content-container"
    >
      <h1 className="signin-title">Hello There!</h1>
      <img className="signin-img" src="https://www.svgrepo.com/show/494520/air-cloud-brain.svg" alt="cloud" />
      <Button type="button" size="lg" className="signin-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
