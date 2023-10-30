// src/components/Card.js
import React from 'react';

const Card = ({ ticket }) => {
  if (!ticket || !ticket.title || !ticket.status || !ticket.userId || ticket.priority === undefined) {
    return <div>Invalid ticket data</div>;
  }

  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>User ID: {ticket.userId}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default Card;
