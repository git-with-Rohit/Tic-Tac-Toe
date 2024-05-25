import React from 'react';
import './Message.css';

const Message = ({ message, onReset }) => {
  return (
    <div className="message-overlay">
      <div className="message-box">
        <h2>{message}</h2>
        <button onClick={onReset}>Reset Game</button>
      </div>
    </div>
  );
};

export default Message;
