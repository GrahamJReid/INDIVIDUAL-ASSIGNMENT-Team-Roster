import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamAndMembers } from '../API/mergedData';

function TeamCard({ teamObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name}?`)) {
      deleteTeamAndMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="team-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.team_image} alt={teamObj.team_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title className="team-card-title">{teamObj.team_name}</Card.Title>
        <p className="card-text bold">{teamObj.public === true ? 'Public' : 'Private' }</p>
        <hr className="team-card-line" />
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
          <Button className="team-view-button">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
          <Button className="team-edit-button">EDIT</Button>
        </Link>
        <Button className="team-delete-button" onClick={deleteThisTeam}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    team_image: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
