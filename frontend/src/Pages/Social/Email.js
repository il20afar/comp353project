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
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

import "./Email.scss";

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
    11.38 *
    Math.max(...visibleEmail.map((elem) => elem.message_subject.length));

  return (
    <div className="email-menu">
      {visibleEmail.map((elem) => (
        <EmailThumbnail
          key={uuid()}
          name={
            <HighlightedContent
              searchTerm={searchTerm}
              content={elem.message_subject}
            />
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

const useSetAssociationUsers = (setAssociationUsers, asso_id) => {
  return React.useRef(() => {
    (async () => {
      const users = await data.send("users", "get", { asso_id });
      console.log(users);
      setAssociationUsers(users);
    })();
  }, []);
};

const EmailCreate = (props) => {
  const { setView, user } = props;

  const [inputValues, setInputValues] = React.useState({
    to: "",
    subject: "",
    content: "",
  });
  const [associationUsers, setAssociationUsers] = React.useState([]);

  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;
    setInputValues(Object.assign({}, inputValues));
  };

  const onEmailSubmit = () => {
    const email = {
      message_subject: inputValues.content,
      content: inputValues.content,
      attachments: "",
      author_id: user.current.user_id,
      recipient_id: 1,
    };
  };

  // Gets available association users
  useSetAssociationUsers(
    setAssociationUsers,
    Number.parseInt(user.current.asso_id)
  );
  console.log(associationUsers);

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
          {["to", "subject"].map((field) => (
            <TextBox
              key={`email-input${field}`}
              type={"input"}
              initialValue={inputValues[field]}
              onChange={(newValue) => onInputValueChange(field, newValue)}
              className={field}
              placeholder={`${field}:`}
              outlineOnChange
              focusOnRender={field === "to"}
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
        value={inputValues.message || ""}
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
        onChange={(content) => setInputValues("message", content)}
        style={{ width: "100%", height: "100%" }}
      />
    </InputModal>
  );
};

const Email = (props) => {
  const {} = props;
  const { user } = React.useContext(MainContext);

  const [view, setView] = React.useState("menu");
  const [visibleEmail, setVisibleEmail] = React.useState([]);
  const [replies, setReplies] = React.useState(null);

  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearchEmailChange = (e) => {
    const val = e ? e : "";
    setSearchTerm(val);
    const filtered = visibleEmail.filter((elem) => elem.title.includes(val));
    setVisibleEmail(val === "" ? visibleEmail : filtered);
  };

  const updateMessages = async () => {
    const res = await data.send("messages", "get", {
      user_id: Number.parseInt(user.current.user_id),
    });
    console.log(res.messages);
    setVisibleEmail(res.messages);
  };

  const actions = [
    <Button
      content={{ show: <FontAwesomeIcon icon={faEdit} color="white" /> }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={() => setView("create")}
    />,
    <SearchBar
      key={"searchbar"}
      initialValue={searchTerm}
      placeholder={"Search email..."}
      onChange={onSearchEmailChange}
      style={{ height: "46px" }}
    />,
  ];

  React.useEffect(() => {
    updateMessages();
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

export default Email;
