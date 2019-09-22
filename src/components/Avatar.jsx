import React from 'react';
import '../stylesheets/avatar.css';

const Avatar = ({ user, size }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`
  }
  return (
    <img className="avatar" style={style} src={`/avatars/${user.avatarUrl}`} alt={user.firstName} />
  );
}

Avatar.defaultProps = {
  size: 20
}

export default Avatar;
