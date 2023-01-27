import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function PublicTeamCard({ teamObj }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS

  return (
    <Card className="team-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.team_image} alt={teamObj.team_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title className="team-card-title">{teamObj.team_name}</Card.Title>
        <p className="card-public">Public</p>
        <hr className="team-card-line" />
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`publicTeams/${teamObj.firebaseKey}`} passHref>
          <Button className="team-view-button">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
      </Card.Body>
    </Card>
  );
}

PublicTeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    team_image: PropTypes.string,
    creator_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
};

export default PublicTeamCard;
