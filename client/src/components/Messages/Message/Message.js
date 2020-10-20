import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, color }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
          <div className="messageBox">
            <p className="messageText"><font color={color}>{ReactEmoji.emojify(text)}</font></p>
          </div>
        )
        : (
            <div className="messageBox">
           <p className="messageText"> <font color={color}>{ReactEmoji.emojify(text)}</font></p>
            </div>
        )
  );
}

export default Message;