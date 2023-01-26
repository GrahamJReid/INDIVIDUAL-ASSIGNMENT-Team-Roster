import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getPublicTeams, getTeams } from '../API/teamsData';
import PublicTeamCard from '../components/PublicTeamCard';
import { useAuth } from '../utils/context/authContext';

const getFilteredItems = (query, teams) => {
  if (!query) {
    return teams;
  }
  return teams.filter((team) => team.team_name.toLowerCase().includes(query.toLowerCase()));
};

export default function ShowPublicTeams() {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    getPublicTeams(user.uid).then(setTeams);
  }, [user]);

  const filteredItems = getFilteredItems(query, teams);

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <div>
        <input className="teams-searchBar" type="text" placeholder="Search Team Name" onChange={(e) => setQuery(e.target.value)} />
        <div className="teams-content-container">{filteredItems.map((team) => (
          <PublicTeamCard key={team.firebaseKey} teamObj={team} />
        ))}
        </div>
      </div>

    </>
  );
}
