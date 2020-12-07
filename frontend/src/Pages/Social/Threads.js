import React from "react";
import {
  D,
  MainContext,
  TextBox,
  data,
  Button,
  Header,
  InputModal,
  SearchBar,
  HighlightedContent,
} from "../../imports";
import Chatbox from "../../Components/Chatbox/Chatbox";
import { v4 as uuid } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

import "./Threads.scss";

const ThreadThumbnail = (props) => {
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
      <div className="thread-element-container-div name">
        <div className="thread-element-div name">{name}</div>
      </div>
      <div className="thread-element-container-div modified-on">
        <div className="thread-element-div modified-on">
          <div>Last updated: </div>
          <div>&nbsp;&nbsp;{modifiedOn}</div>
        </div>
      </div>
      <div className="thread-element-container-div created-by">
        <div className="thread-element-div created-by">
          <div>Created by: </div>
          <div>&nbsp;&nbsp;{createdBy}</div>
        </div>
      </div>
      <div className="thread-element-container-div numbermsg">
        <div className="thread-element-div numbermsg">
          <FontAwesomeIcon icon={faStickyNote} />
          <div>&nbsp;&nbsp;{numberMessages}</div>
        </div>
      </div>
    </div>
  );
};

const ThreadMenu = (props) => {
  const { visibleThreads, setView, searchTerm } = props;

  const max =
    11.38 * Math.max(...visibleThreads.map((elem) => elem.title.length));

  return (
    <div className="thread-menu">
      {visibleThreads.map((elem) => (
        <ThreadThumbnail
          key={uuid()}
          name={
            <HighlightedContent searchTerm={searchTerm} content={elem.title} />
          }
          numberMessages={elem.number_of_replies}
          modifiedOn={elem.last_update_time}
          createdBy={elem.creator_username}
          onClick={() => setView(elem)}
          gridTemplateColumns={`minmax(300px, ${max}px) minmax(0px, 300px) minmax(0px,300px) minmax(60px, 80px)`}
        />
      ))}
    </div>
  );
};

const ThreadView = (props) => {
  const { user, currentThread, setView } = props;
  const [visibleReplies, setVisibleReplies] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchHandler = (e) => {
    setSearchValue(e);
    setVisibleReplies(
      e === "" ? messages : messages.filter((elem) => elem.content.includes(e))
    );
  };
  const updateReplies = async () => {
    const res = await data.send("replies", "get", {
      thread_id: currentThread.thread_id,
    });
    setMessages(res.replies);
    setVisibleReplies(res.replies);
  };

  React.useEffect(() => {
    updateReplies();
  }, []);

  return (
    <div className="thread-view">
      <div className="thread-name-container">
        <div className="thread-name-text">{currentThread.title}</div>
      </div>
      <div className="threads-header-container">
        <div className="menu-toggle-container" onClick={(e) => setView("menu")}>
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Threads</div>
        </div>
        <SearchBar
          placeholder={"Search replies..."}
          initialValue={searchValue}
          onChange={onChangeSearchHandler}
          onCancel={() => onChangeSearchHandler("")}
        />
      </div>
      <div className="chatbox-container">
        <Chatbox
          user={user}
          currentThread={currentThread}
          updateReplies={updateReplies}
          replies={visibleReplies}
          searchTerm={searchValue}
        />
      </div>
    </div>
  );
};

const ThreadCreate = (props) => {
  const { setView, user } = props;
  const ref = React.useRef(null);

  const onChange = (e) => {
    const val = e.target.value;

    setInputModalView(val !== "" ? "edit" : "display");
  };

  const [inputModalView, setInputModalView] = React.useState("display");

  return (
    <InputModal
      view={inputModalView}
      isEditable={false}
      widthPadding={300}
      heightPadding={200}
      onClose={() => setView("menu")}
      onConfirm={async () => {
        const res = await data.send("threads", "create", {
          title: ref.current.value,
          creation_time: "2020-11-26 17:41:00",
          last_update_time: "2020-11-26 17:41:00",
          creator_username: user.current.username,
          creator_id: user.current.user_id,
        });

        const threads = await data.send("threads", "get");

        setView(
          threads.threads.find(
            (elem) =>
              elem.title === ref.current.value &&
              elem.creator_id === user.current.user_id
          ).title
        );
      }}
    >
      <div
        className="title"
        style={{
          fontSize: "24px",
          color: "white",
          marginBottom: "0px",
          height: "30px",
        }}
      >
        Create a new thread:
      </div>
      <TextBox
        type={"input"}
        ref={ref}
        initialValue={""}
        onChange={onChange}
        outlineOnChange
        focusOnRender={true}
        readOnly={false}
        height="80px"
      />
    </InputModal>
  );
};

const Threads = (props) => {
  const {} = props;
  const { user } = React.useContext(MainContext);

  const [view, setView] = React.useState("menu");
  const [visibleThreads, setVisibleThreads] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const serverThreads = React.useRef(null);

  const onSearchThreadChange = (e) => {
    setSearchValue(e);
    const filtered = visibleThreads.filter((elem) => elem.title.includes(e));
    setVisibleThreads(e === "" ? serverThreads.current : filtered);
  };

  const actions = [
    <SearchBar
      key={"searchbar"}
      initialValue={searchValue}
      placeholder={"Search threads..."}
      onChange={onSearchThreadChange}
      onCancel={() => onSearchThreadChange("")}
      style={{ height: "46px" }}
    />,
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "420px",
      }}
    >
      <Button
        key="button"
        content={{ show: "all", hide: "√" }}
        style={{
          show: { width: "200px", textTransform: "capitalize" },
          hide: { width: "200px", textTransform: "capitalize" },
        }}
        dropdown={[
          { elem: "Classified", eventKey: "classified" },
          { elem: "General", eventKey: "general" },
          { elem: "Public", eventKey: "public" },
        ]}
        onSelect={null}
      />
      <Button
        content={{ show: "Create +" }}
        style={{ show: { width: "200px" }, hide: { width: "200px" } }}
        onClick={() => setView("create")}
      />
    </div>,
  ];

  React.useEffect(() => {
    updateThreads();
  }, []);

  const updateThreads = async () => {
    const threads = await data.send("threads", "get");
    serverThreads.current = threads.threads;
    setVisibleThreads(serverThreads.current);
  };

  return (
    <D cn="threads-page">
      {view === "create" && <ThreadCreate user={user} setView={setView} />}
      {view === "menu" && (
        <Header keyName="threads-header" height="80px" actions={actions} />
      )}
      {view === "menu" || view === "create" ? (
        <ThreadMenu
          visibleThreads={visibleThreads}
          view={view}
          setView={setView}
          searchTerm={searchValue}
        />
      ) : (
        <ThreadView user={user} currentThread={view} setView={setView} />
      )}
    </D>
  );
};

export default Threads;
