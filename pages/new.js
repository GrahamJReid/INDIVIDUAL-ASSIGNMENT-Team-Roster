import Head from 'next/head';
import React from 'react';
import MemberForm from '../components/forms/MemberForm';

export default function AddAMember() {
  return (
    <>
      <Head>
        <title>Create Member</title>
      </Head>
      <MemberForm />
    </>
  );
}
