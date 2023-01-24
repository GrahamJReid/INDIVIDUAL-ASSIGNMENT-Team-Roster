import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../API/teamsData';
import TeamForm from '../../../components/forms/TeamsForm';

export default function EditTeams() {
  const [editTeam, setEditTeam] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<TeamForm obj={editTeam} />);
}
