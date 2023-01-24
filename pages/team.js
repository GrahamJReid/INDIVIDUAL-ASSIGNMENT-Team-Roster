import React, { useEffect, useState } from 'react';
import { getMembers } from '../API/memberData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

const getFilteredItems = (query, members) => {
  if (!query) {
    return members;
  }
  return members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase())
  || member.role.toLowerCase().includes(query.toLowerCase()));
};

export default function ShowMembers() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const displayMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getMembers(user.uid).then(setMembers);
  }, [user.uid]);

  const filteredItems = getFilteredItems(query, members);

  return (
    <><input type="text" placeholder="Search Member Name" onChange={(e) => setQuery(e.target.value)} />
      <div>{filteredItems.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={displayMembers} />
      ))}
      </div>
    </>
  );
}
