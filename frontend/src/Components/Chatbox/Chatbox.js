import React from "react";
import { useState, useRef } from "react";
import { data, userFirstLastName } from "../../imports";
import Textbox from "./Textbox";
import Message from "./Message";
import { v4 as uuid } from "uuid";

import "./Chatbox.scss";

const Chatbox = (props) => {
  const {
    user,
    associationUsers,
    replies = [],
    updateReplies,
    currentThread,
    searchTerm = "",
  } = props;

  const sendMessage = async (message) => {
    const newReply = {
      content: message,
      author_id: user.current.user_id,
      thread_id: currentThread.thread_id,
    };
    const response = await data.send("replies", "create", newReply);
    if (response !== 1) {
      alert("Your message couldn't be sent!");
    }
    updateReplies();
  };

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.scrollTo(0, ref.current.getBoundingClientRect().height);
  }, []);

  return (
    <div className="chatbox">
      <div className="messagebox-container">
        <div ref={ref} className="messagebox">
          {replies.map((elem) => (
            <Message
              key={uuid()}
              type={elem.author_id === user.current.user_id ? "self" : "others"}
              content={elem.content}
              date={elem.creation_time}
              time=""
              username={
                associationUsers
                  ? userFirstLastName(
                      associationUsers.find(
                        (user) => elem.author_id === user.user_id
                      )
                    )
                  : ""
              }
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
          onClick={(e) => sendMessage(e)}
        />
      </div>
    </div>
  );
};

export default Chatbox;
