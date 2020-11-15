import React from "react";
import { useState, useRef } from "react";
import Textbox from "./Textbox";
import Message from "./Message";
import { v4 as uuid } from "uuid";

import "./Chatbox.scss";

const createMessage = (date, time, username, content, type = "others") => {
  return <Message key={uuid()} {...{ date, time, content, username, type }} />;
};

const Chatbox = (props) => {
  const { user, messages: inputMessage = [] } = props;
  const intervalId = useRef(0);
  const [messages, setMessages] = useState(inputMessage);

  const sendMessage = async (message, username = user.current.name) => {
    // const response = await sendData({ username: username, message: message });
    // if (response !== "message_accepted") {
    //   alert("Your message couldn't be sent!");
    // }
    console.log(message);

    const newMessages = [
      ...messages,

      createMessage("10-10-10", "13:44", username, message, "self"),
    ];

    setMessages(newMessages);
  };

  React.useEffect(() => {
    setMessages([
      createMessage("10-10-10", "13:44", "afar", "My name is afar.", "self"),
    ]);
  }, []);

  console.log(messages);

  return (
    <div className="chatbox">
      <div className="messagebox-container">
        <div className="messagebox">{messages}</div>
      </div>
      <div className="textbox-container">
        <Textbox
          type="textarea"
          placeholder="Send a message!"
          buttonContent="Send"
          onClick={(e) => sendMessage(e, user.current.username)}
        />
      </div>
    </div>
  );
};

export default Chatbox;
