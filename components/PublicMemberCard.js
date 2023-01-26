import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import { getSingleTeam } from '../API/teamsData';

function PublicMemberCard({ memberObj }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS

  const [teamName, setTeamName] = useState({});
  useEffect(() => {
    getSingleTeam(memberObj.team_id).then(setTeamName);
  }, [memberObj, teamName]);

  return (
    <Card className="team-card text-white" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title className="team-card-title">{memberObj.name}</Card.Title>
        <p>Role: {memberObj.role}</p>
        <p>Team: {teamName.team_name}</p>
        <hr className="team-card-line" />
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}

      </Card.Body>
    </Card>
  );
}

PublicMemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
  }).isRequired,
};

export default PublicMemberCard;
