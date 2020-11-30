import React from "react";
import { useState, useRef } from "react";
import Textbox from "./Textbox";
import Message from "./Message";
import { v4 as uuid } from "uuid";

import "./Chatbox.scss";

const Chatbox = (props) => {
  const { user, replies = [], searchTerm = "" } = props;
  const intervalId = useRef(0);

  const sendMessage = async (message, username = user.current.name) => {
    // const response = await sendData({ username: username, message: message });
    // if (response !== "message_accepted") {
    //   alert("Your message couldn't be sent!");
    // }
    // const newreplies = [
    //   ...replies,
    // ];
    // setreplies(newreplies);
  };

  // React.useEffect(() => {
  //   setreplies([
  //     createMessage("10-10-10", "13:44", "afar", "My name is afar.", "self"),
  //   ]);
  // }, []);

  return (
    <div className="chatbox">
      <div className="messagebox-container">
        <div className="messagebox">
          {replies.map((elem) => (
            <Message
              type="others"
              content={elem.content}
              date={elem.creation_time}
              time=""
              username={elem.author_id}
              searchTerm={searchTerm}
            />
          ))}
        </div>
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
