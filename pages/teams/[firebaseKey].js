/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleTeam, getTeamMembers } from '../../API/teamsData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  const getFilteredItems = (query, teamMembers) => {
    if (!query) {
      return teamMembers;
    }
    return teamMembers.filter((member) => member.name.toLowerCase().includes(query.toLowerCase())
    || member.role.toLowerCase().includes(query.toLowerCase()));
  };
  const [query, setQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    getTeamMembers(firebaseKey).then(setTeamMembers);
  }, [firebaseKey]);
  useEffect(() => {
    getTeamMembers(firebaseKey).then(setTeamMembers);
  }, [firebaseKey]);

  const displayTeamMembers = () => {
    getTeamMembers(firebaseKey).then(setTeamMembers);
  };
  const filteredItems = getFilteredItems(query, teamMembers);

  return (
    <>
      <Head>
        <title>View details for {teamDetails.team_name}</title>
      </Head>
      <h2 className="team-view-details-title">{teamDetails.team_name}</h2>
      <div className="team-image-container">
        <img className="team-view-image" src={teamDetails.team_image} alt={teamDetails.team_name} />
      </div>
      <div className="team-view-searchbar-container"> <input className="team-view-searchbar" type="text" placeholder="Search Member Name or Role" onChange={(e) => setQuery(e.target.value)} /></div>
      <div className="members-content-container">
        {filteredItems.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={displayTeamMembers} />
        ))}
      </div>
    </>
  );
}
