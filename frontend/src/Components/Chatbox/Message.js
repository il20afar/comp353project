import React from "react";
import { HighlightedContent } from "../../imports";
import { v4 as uuid } from "uuid";

import "./Message.scss";

const Message = (props) => {
  const { type, content, searchTerm = "", date, time, username } = props;

  return (
    <div className={`message ${type}`}>
      <div className="message-container">
        <div className="content-container">
          <div className="content">
            <HighlightedContent searchTerm={searchTerm} content={content} />
          </div>
        </div>
        <div className="username-container">
          <div className="bottom-container">
            <div className="username">{username}</div>
            <div className="kw">&nbsp;at&nbsp;</div>
            <div className="time">{time}</div>
            <div className="kw">&nbsp;on&nbsp;</div>
            <div className="date">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
