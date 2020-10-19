import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, color }, name }) => {
  let isSentByCurrentUser = false;
  // const color = blue;
  // console.log(color);

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox">
            <p className="messageText"><font color={color}>{ReactEmoji.emojify(text)}</font></p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer">
             <p className="sentText pl-10 ">{user}</p>
            <div className="messageBox">
           <p className="messageText"> <font color={color}>{ReactEmoji.emojify(text)}</font></p>
            </div>
           
          </div>
        )
  );
}

export default Message;