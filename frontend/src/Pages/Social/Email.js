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
import "react-bootstrap-typeahead/css/Typeahead.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

import "./Email.scss";

const firstLastName = (user) => `${user.first_name} ${user.last_name}`;

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
  const { setView, ...fields } = props;

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
      <div className="email-display">
        {Object.entries(fields).map(([key, val]) => {
          console.log(key, val);
          return (
            <D key={`edit-info-field-${key}`} cn={`edit-info-field ${key}`}>
              <D cn="field-title">{key} </D>
              <div className="field-display">{val}</div>
            </D>
          );
        })}
      </div>
    </InputModal>
  );
};

const EmailCreate = (props) => {
  const { user, setView, associationUsers, updateAssociationUsers } = props;

  const [inputValues, setInputValues] = React.useState({
    to: "",
    subject: "",
    content: "",
  });
  const [selectedUser, setSelectedUser] = React.useState([]);

  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;
    console.log(eventKey, newValue);
    setInputValues(Object.assign({}, inputValues));
  };

  const onEmailSubmit = async () => {
    console.log(inputValues, selectedUser);
    const email = {
      message_subject: inputValues.content,
      content: inputValues.content,
      attachments: "",
      author_id: Number.parseInt(user.current.user_id),
      recipient_id: Number.parseInt(selectedUser.user_id),
    };
    const res = await data.send("messages", "create", email);
    if (res === 1) {
      setView("menu");
    }
    console.log(email, res);
  };

  const onTypeAheadChange = (value) => {
    const selectionId = value.length === 1 && value[0].id;
    const isUser = associationUsers.find(
      (user) => user.user_id === selectionId
    );
    if (isUser) {
      setSelectedUser(isUser);
    }
  };

  // Gets available association users
  React.useEffect(() => {
    updateAssociationUsers();
  }, []);
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
          <Typeahead
            id={uuid()}
            onChange={(selected) => onTypeAheadChange(selected)}
            placeholder="To:"
            options={
              associationUsers
                ? associationUsers.map((user) => ({
                    id: user.user_id,
                    label: firstLastName(user),
                  }))
                : ["no matches"]
            }
            selected={null}
          />
          <TextBox
            key={`email-input${"subject"}`}
            type={"input"}
            initialValue={inputValues["subject"]}
            onChange={(newValue) => onInputValueChange("subject", newValue)}
            className={"subject"}
            placeholder={`${"subject"}:`}
            outlineOnChange
            focusOnRender={"subject" === "to"}
            readOnly={false}
            height="40px"
          />
        </div>
        <div className="right-container">
          <div className="selected-recipients-container"></div>
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
        onChange={(content) => onInputValueChange("message", content)}
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
  const [associationUsers, setAssociationUsers] = React.useState([]);

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

  const updateAssociationUsers = async () => {
    const res = await data.send("users", "get", {
      asso_id: user.current.asso_id,
    });
    console.log("users: ", res.users);
    setAssociationUsers(res.users);
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
    updateAssociationUsers();
  }, [view]);

  return (
    <D cn="email-page">
      {view === "create" && (
        <EmailCreate
          user={user}
          setView={setView}
          associationUsers={associationUsers}
          updateAssociationUsers={updateAssociationUsers}
        />
      )}
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
        <EmailView
          from={firstLastName(
            associationUsers.find((user) => user.user_id === view.author_id)
          )}
          subject={view.message_subject}
          content={view.content}
          setView={setView}
        />
      )}
    </D>
  );
};

export default Email;
