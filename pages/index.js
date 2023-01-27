/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getTeams } from '../API/teamsData';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [numberTeams, setNumberTeams] = useState([]);
  let count = 0;
  for (let i = 0; i < numberTeams.length; ++i) {
    // eslint-disable-next-line no-plusplus
    ++count;
  }
  useEffect(() => {
    getTeams(user.uid).then(setNumberTeams);
  }, [user]);
  return (
    <>
      <Head>
        <title>Roster Home {user.displayName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Concert+One&display=swap" rel="stylesheet" />
      </Head>
      <div className="home-content-container">
        <img className="home-img" src={user.photoURL} alt="self" height="200" width="200" />
        <h1 className="home-title">Hello {user.displayName}! </h1>
        <h2 className="home-title">Active Teams: {count}</h2>
        <p className="home-timestamp">Email: {user.email}</p>
        <h3 className="home-timestamp"> Login Time Stamp: {user.metadata.lastSignInTime}</h3>
        <hr className="home-line1" />
        <hr className="home-line2" />
        <hr className="home-line3" />
        <Button className="home-signout" type="button" size="lg" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Home;
