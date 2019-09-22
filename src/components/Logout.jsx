import React from 'react';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../utils';

const Logout = (props) => {
  logoutUser();

  return (
    <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
  );
}

export default Logout;
