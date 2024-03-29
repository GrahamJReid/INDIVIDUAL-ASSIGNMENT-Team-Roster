/* eslint-disable @next/next/no-page-custom-font */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createTeams, updateTeams } from '../../API/teamsData';

const initialState = {
  team_image: '',
  team_name: '',
  public: false,
};
export default function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
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
      updateTeams(formInput)
        .then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid, creator_name: user.displayName };
      createTeams(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeams(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };
  return (
    <>
      <Head>
        <title>Create/Edit Team</title>
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap" rel="stylesheet" />
      </Head>

      <Form onSubmit={handleSubmit}>
        <h2 className="team-form-title">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>
        <div className="team-form-container">
          <FloatingLabel controlId="floatingInput1" label="Enter Team Name">
            <Form.Control
              className="team-input-bar"
              type="text"
              placeholder="Enter Name"
              name="team_name"
              value={formInput.team_name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Enter Team Image URL">
            <Form.Control
              className="team-input-bar"
              type="url"
              placeholder="Enter an image url"
              name="team_image"
              value={formInput.team_image}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Form.Check
            className="public-switch"
            type="switch"
            id="public"
            name="public"
            label="public"
            checked={formInput.public}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                public: e.target.checked,
              }));
            }}
          />

        </div>
        <Button className="team-form-submitbtn" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </>

  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    team_image: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
