import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getTeams } from '../API/teamsData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

const getFilteredItems = (query, teams) => {
  if (!query) {
    return teams;
  }
  return teams.filter((team) => team.team_name.toLowerCase().includes(query.toLowerCase()));
};

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const displayTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
  }, [user.uid]);

  const filteredItems = getFilteredItems(query, teams);

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <div>
        <input className="teams-searchBar" type="text" placeholder="Search Team Name" onChange={(e) => setQuery(e.target.value)} />
        <div className="teams-content-container">{filteredItems.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={displayTeams} />
        ))}
        </div>
      </div>

    </>
  );
}
