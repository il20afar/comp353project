import React from "react";
import { D, MainContext, TextBox } from "../../../../imports";
import Chatbox from "../../../../Components/Chatbox/Chatbox";
import { v4 as uuid } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

import "./Threads.scss";

const ThreadView = (props) => {
  const { user, messages, showThread, setShowThread } = props;

  return (
    <div className="thread-view">
      <div className="thread-name-container">
        <div className="thread-name-text">{showThread}</div>
      </div>
      <div className="threads-header-container">
        <div
          className="menu-toggle-container"
          onClick={(e) => setShowThread("")}
        >
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Threads</div>
        </div>
        <div className="searchbar">
          <TextBox type="input" placeholder="Search" buttonContent="Send" />
          <div className="menu-search-icon">
            <FontAwesomeIcon icon={faSearch} color="black" size="sm" />
          </div>
        </div>
      </div>
      <div className="chatbox-container">
        <Chatbox user={user} messages={messages} />
      </div>
    </div>
  );
};

const threads = [
  "0",
  "Ads",
  "Make CondoAssociation Great Again",
  "Please help!",
  "Hello, I'm the new guy",
];

const messages = [
  "asdflhajsdkfa",
  "asdkhjfhasiudfahksjdfhuiafyhjklasdhfajsdfhla",
  "aljkhasdkfhalisdufhaliusdfhasdjkfhalskjdfh",
  "asdkjflaksjhdflajsdhfalksdjfhalskdjfhalksdjfhalksdjfhalksdjhfalskdjfhalskdjfhasdlkjh",
];

const Thread = (props) => {
  const {
    name,
    numberMessages,
    modifiedOn,
    createdBy,
    onClick,
    gridTemplateColumns,
  } = props;
  return (
    <div
      className="thread"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(name)}
    >
      <div className="thread-element-container name">
        <div className="thread-element name">{name}</div>
      </div>
      <div className="thread-element-container modified-on">
        <div className="thread-element modified-on">
          <div>Last updated: </div>
          <div>&nbsp;&nbsp;{modifiedOn}</div>
        </div>
      </div>
      <div className="thread-element-container created-by">
        <div className="thread-element created-by">
          <div>Created by: </div>
          <div>&nbsp;&nbsp;{createdBy}</div>
        </div>
      </div>
      <div className="thread-element-container numbermsg">
        <div className="thread-element numbermsg">
          <FontAwesomeIcon icon={faStickyNote} />
          <div>&nbsp;&nbsp;{numberMessages}</div>
        </div>
      </div>
    </div>
  );
};

const ThreadMenu = (props) => {
  const { showThread, setShowThread } = props;

  React.useEffect(() => {
    const max = 12 * Math.max(...threads.map((elem) => elem.length));
    console.log(max);
  }, []);
  const max = 11.38 * Math.max(...threads.map((elem) => elem.length));

  return (
    <div className="thread-menu">
      {threads.map((elem, index) => (
        <Thread
          key={uuid()}
          name={elem}
          numberMessages={index * 18}
          modifiedOn="10-10-10 12:38pm"
          createdBy="afar"
          onClick={setShowThread}
          gridTemplateColumns={`minmax(300px, ${max}px) minmax(0px, 300px) minmax(0px,300px) minmax(60px, 80px)`}
        />
      ))}
    </div>
  );
};

const Threads = (props) => {
  const {} = props;
  const { user } = React.useContext(MainContext);

  const [showThread, setShowThread] = React.useState("");

  console.log(showThread);
  return (
    <D cn="threads-page">
      {showThread === "" ? (
        <ThreadMenu showThread={showThread} setShowThread={setShowThread} />
      ) : (
        <ThreadView showThread={showThread} setShowThread={setShowThread} />
      )}
    </D>
  );
};

export default Threads;
