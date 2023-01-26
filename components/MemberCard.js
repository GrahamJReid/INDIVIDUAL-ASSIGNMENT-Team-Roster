import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMembers } from '../API/memberData';
import { getSingleTeam } from '../API/teamsData';

function MemberCard({ memberObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMembers(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
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
        <Link href={`/${memberObj.firebaseKey}`} passHref>
          <Button className="team-view-button">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/edit/${memberObj.firebaseKey}`} passHref>
          <Button className="team-edit-button">EDIT</Button>
        </Link>
        <Button className="team-delete-button" onClick={deleteThisMember}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
