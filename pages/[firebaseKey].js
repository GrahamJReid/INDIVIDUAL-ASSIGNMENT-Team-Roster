/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleMember } from '../API/memberData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});

  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>View details for {memberDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div>
          <img className="view-member-image" src={memberDetails.image} alt={memberDetails.name} />
        </div>
        <div className="text-white ms-5 details">
          <h5 className="view-member-name">
            {memberDetails.name}
          </h5>
          <p> Role: {memberDetails.role}</p>
          <hr />
        </div>
      </div>
    </>
  );
}
