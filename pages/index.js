import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Roster Home {user.displayName}</title>
      </Head>
      <div className="home-content-container">
        <h1 className="home-title">Hello {user.displayName}! </h1>
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
