/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div>
      {message}
    </div>
  );
};

export default Notification;
