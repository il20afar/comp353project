import React from "react";
import Textbox from "./Textbox";
import Message from "./Message";
import { D, data } from "../../imports";
import { v4 as uuid } from "uuid";

import "./Chatbox.scss";

const createMessage = (date, time, username, content, type = "others") => {
  return <Message key={uuid()} {...{ date, time, content, username, type }} />;
};

const Chatbox = (props) => {
  const { user } = props;
  const intervalId = React.useRef(0);
  const [messages, setMessages] = React.useState([]);

  const sendMessage = async (message, username = user.current.name) => {};

  React.React.useEffect(() => {}, [messages]);

  return (
    <D cn="chatbox">
      <D cn="messagebox-container">
        <D cn="messagebox">{messages}</D>
      </D>
      <D cn="textbox-container">
        <Textbox
          type="textarea"
          placeholder="Send a message!"
          buttonContent="Send"
          onClick={(e) => sendMessage(e)}
        />
      </D>
    </D>
  );
};

export default Chatbox;
