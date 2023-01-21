// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../API/memberData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  // const router = useRouter();
  const displayMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getMembers(user.uid).then(setMembers);
  }, [user.uid]);
  return (
    <div>{members.map((member) => (
      <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={displayMembers} />
    ))}
    </div>
  );
}
