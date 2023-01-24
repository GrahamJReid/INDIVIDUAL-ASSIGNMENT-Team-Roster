import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createMembers, updateMembers } from '../../API/memberData';
import { getTeams } from '../../API/teamsData';

const initialState = {
  image: '',
  name: '',
  role: '',
  team_id: '',
};
export default function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [allTeams, setAllTeams] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getTeams(user.uid).then(setAllTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMembers(formInput)
        .then(() => router.push(`/teams/${[obj.team_id]}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMembers(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMembers(patchPayload).then(() => {
          router.push(`/teams/${[obj.team_id]}`);
        });
      });
    }
  };
  return (
    <>
      <Head>
        <title>Edit Member</title>
      </Head>

      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

        <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput1" label="role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="team_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.team_id} // FIXME: modify code to remove error
            required
          >
            <option value="">Select a Team</option>
            {
            allTeams.map((team) => (

              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >

                {team.team_name}
              </option>

            ))
          }

          </Form.Select>
        </FloatingLabel>
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
      </Form>
    </>

  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
