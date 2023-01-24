/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleTeam, getTeamMembers } from '../../API/teamsData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);
  useEffect(() => {
    getTeamMembers(firebaseKey).then(setTeamMembers);
  }, [firebaseKey]);
  const displayTeamMembers = () => {
    getTeamMembers(firebaseKey).then(setTeamMembers);
  };

  return (
    <>
      <Head>
        <title>View details for {teamDetails.team_name}</title>
      </Head>
      <h2>{teamDetails.team_name}</h2>
      <div className="d-flex flex-column">
        <img src={teamDetails.team_image} alt={teamDetails.team_name} style={{ width: '300px' }} />
      </div>
      <div>{teamMembers.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={displayTeamMembers} />
      ))}
      </div>

    </>
  );
}
