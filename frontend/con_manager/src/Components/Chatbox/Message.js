import React from "react";
import { D } from "../../imports";
import "./Message.scss";
import "../../Styles/Utils.scss";

const Message = (props) => {
  const { type, content, date, time, username } = props;
  return (
    <D cn={`message ${type}`}>
      <D cn="message-container">
        <D cn="content-container">
          <D cn="content">{content}</D>
        </D>
        <D cn="username-container">
          <D cn="bottom-container">
            <D cn="username">{username}</D>
            <D cn="kw">&nbsp;at&nbsp;</D>
            <D cn="time">{time}</D>
            <D cn="kw">&nbsp;on&nbsp;</D>
            <D cn="date">{date}</D>
          </D>
        </D>
      </D>
    </D>
  );
};

export default Message;
