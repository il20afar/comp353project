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

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

import "./UserList.scss";

const EmailThumbnail = (props) => {
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
      className="email-thumbnail"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(name)}
    >
      <div className="email-element-container name">
        <div className="email-element name">{name}</div>
      </div>
      <div className="email-element-container modified-on">
        <div className="email-element modified-on">
          <div>Last updated: </div>
          <div>&nbsp;&nbsp;{modifiedOn}</div>
        </div>
      </div>
      <div className="email-element-container created-by">
        <div className="email-element created-by">
          <div>Created by: </div>
          <div>&nbsp;&nbsp;{createdBy}</div>
        </div>
      </div>
      <div className="email-element-container numbermsg">
        <div className="email-element numbermsg">
          <FontAwesomeIcon icon={faStickyNote} />
          <div>&nbsp;&nbsp;{numberMessages}</div>
        </div>
      </div>
    </div>
  );
};

const EmailMenu = (props) => {
  const { visibleEmail, setView, searchTerm } = props;

  const max =
    11.38 * Math.max(...visibleEmail.map((elem) => elem.title.length));

  return (
    <div className="email-menu">
      {visibleEmail.map((elem) => (
        <EmailThumbnail
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

const EmailView = (props) => {
  const { user, messages, view, setView, setReplies } = props;

  return <div className="email-view"></div>;
};

const EmailCreate = (props) => {
  const { setView, user } = props;
  const [value, setValue] = React.useState("");

  const refs = {
    to: React.useRef(null),
    subject: React.useRef(null),
  };

  const onEmailSubmit = () => {
    const email = {
      to: refs.to.current.value,
      subject: refs.subject.current.value,
      content: value,
      author_id: user.current.user_id,
    };
  };

  const onContentChange = (value) => {};

  return (
    <InputModal
      view={"display"}
      isEditable={false}
      widthPadding={100}
      heightPadding={100}
      onCancel={() => setView("menu")}
      onClose={() => setView("menu")}
      onConfirm={async () => {}}
    >
      <div className="email-controls">
        <div className="left-container">
          {["to", "subject"].map((elem) => (
            <TextBox
              type={"input"}
              ref={refs[elem]}
              initialValue=""
              className={elem}
              placeholder={`${elem}:`}
              outlineOnChange
              focusOnRender={false}
              readOnly={false}
              height="40px"
            />
          ))}
        </div>
        <div className="right-container">
          <Button
            content={{
              show: <FontAwesomeIcon icon={faPaperPlane} color="white" />,
            }}
            style={{
              show: {
                width: "80px",
                height: "80px",
                borderRadius: "12px",
                backgroundColor: "rgb(109, 109, 255)",
                border: "none",
              },
            }}
            onClick={() => onEmailSubmit()}
          />
        </div>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
        onChange={setValue}
        style={{ width: "100%", height: "100%" }}
      />
    </InputModal>
  );
};

const UserList = (props) => {
  const {} = props;
  const { user } = React.useContext(MainContext);

  const [view, setView] = React.useState("menu");
  const [visibleEmail, setVisibleEmail] = React.useState([]);
  const [replies, setReplies] = React.useState(null);
  const searchTerm = React.useRef("");
  const serverEmail = React.useRef(null);

  const onSearchEmailChange = (e) => {
    const val = e ? e : "";
    searchTerm.current = val;
    const filtered = visibleEmail.filter((elem) => elem.title.includes(val));
    setVisibleEmail(val === "" ? serverEmail.current : filtered);
  };

  const actions = [
    <Button
      content={{ show: <FontAwesomeIcon icon={faEdit} color="white" /> }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={() => setView("create")}
    />,
    <SearchBar
      key={"searchbar"}
      placeholder={"Search email..."}
      onChange={onSearchEmailChange}
      style={{ height: "46px" }}
    />,
  ];

  React.useEffect(() => {
    (async () => {
      const email = await data.send("threads", "get");
      serverEmail.current = email.threads;
      setVisibleEmail(serverEmail.current);

      const res = await data.send("replies", "get");
      setReplies(res.replies);
    })();
  }, [view]);

  return (
    <D cn="email-page">
      {view === "create" && <EmailCreate user={user} setView={setView} />}
      {view === "menu" && (
        <Header keyName="email-header" height="80px" actions={actions} />
      )}
      {view === "menu" || view === "create" ? (
        <EmailMenu
          visibleEmail={visibleEmail}
          view={view}
          setView={setView}
          searchTerm={searchTerm.current}
        />
      ) : (
        <EmailView />
      )}
    </D>
  );
};

export default UserList;
