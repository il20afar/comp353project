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
  userFirstLastName,
  UserList,
} from "../../imports";
import { v4 as uuid } from "uuid";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

import "./Email.scss";

const EmailThumbnail = (props) => {
  const { name, date, from, read, onClick, gridTemplateColumns } = props;
  return (
    <div
      className="email-thumbnail"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(name)}
    >
      <div className="email-element-container name">
        Message subject:
        <div className="email-element name">{name}</div>
      </div>
      <div className="email-element-container date">
        Date:
        <div className="email-element date">
          <div>{date}</div>
        </div>
      </div>
      <div className="email-element-container from">
        <span>
          <FontAwesomeIcon icon={faUser} />
          From:{" "}
        </span>
        <div className="email-element from">
          <div>{from}</div>
        </div>
      </div>
      <div className="email-element-container read">
        <FontAwesomeIcon
          icon={read === "unread" ? faEnvelope : faEnvelopeOpen}
          color={read === "unread" ? "rgb(255, 169, 112)" : "ghostwhite"}
        />

        <div className="email-element read"></div>
      </div>
    </div>
  );
};

const EmailMenu = (props) => {
  const { visibleEmail, view, setView, searchTerm } = props;

  const [associationUsers, setAssociationUsers] = React.useState([]);

  const updateAssoUsers = async () => {
    const res = await data.send("users", "get");
    setAssociationUsers(res.users);
  };
  console.log(visibleEmail);

  React.useEffect(() => {
    updateAssoUsers();
  }, [view]);

  console.log(visibleEmail);

  return (
    <div className="email-menu">
      {visibleEmail ? (
        visibleEmail.map((elem) => (
          <EmailThumbnail
            key={uuid()}
            name={
              <HighlightedContent
                searchTerm={searchTerm}
                content={elem.message_subject}
              />
            }
            date={elem.creation_time}
            from={
              associationUsers.find((user) => user.user_id === elem.author_id)
                ? userFirstLastName(
                    associationUsers.find(
                      (user) => user.user_id === elem.author_id
                    )
                  )
                : ""
            }
            read={elem.read_status}
            onClick={async () => {
              const res = await data.send("messages", "read", {
                message_id: Number.parseInt(elem.message_id),
              });
              console.log(res);
              setView(elem);
            }}
          />
        ))
      ) : (
        <div className="no-emails">Inbox empty...</div>
      )}
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
          return (
            <D key={`edit-info-field-${key}`} cn={`edit-info-field ${key}`}>
              <D cn="field-title">{key} </D>
              <div
                className="field-display"
                dangerouslySetInnerHTML={{ __html: val }}
              />
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
    subject: "",
    message: "",
  });
  const [selectedUser, setSelectedUser] = React.useState([]);

  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;

    setInputValues(Object.assign({}, inputValues));
  };

  const onEmailSubmit = async () => {
    const email = {
      message_subject: inputValues.subject,
      content: inputValues.message,
      author_id: Number.parseInt(user.current.user_id),
      recipient_id: Number.parseInt(selectedUser.user_id),
    };

    const res = await data.send("messages", "create", email);
    if (res === 1) {
      setView("menu");
    }
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
          <UserList
            associationUsers={associationUsers}
            onTypeAheadChange={onTypeAheadChange}
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
  const [emails, setEmails] = React.useState([]);
  const [visibleEmail, setVisibleEmail] = React.useState([]);
  const [associationUsers, setAssociationUsers] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearchEmailChange = (e) => {
    const val = e ? e : "";
    setSearchTerm(val);
    if (!visibleEmail) return null;

    const filtered = emails.filter((elem) =>
      elem.message_subject.includes(val)
    );
    setVisibleEmail(val === "" ? emails : filtered);
  };

  const updateMessages = async () => {
    const params = {
      user_id: Number.parseInt(user.current.user_id),
    };
    const res = await data.send("messages", "get", params);
    setEmails(res.messages);
    setVisibleEmail(res.messages);
  };

  const updateAssociationUsers = async () => {
    const res = await data.send("users", "get", {
      asso_id: user.current.asso_id,
    });

    setAssociationUsers(res.users);
  };

  const actions = [
    <SearchBar
      key={"searchbar"}
      initialValue={searchTerm}
      placeholder={"Search email..."}
      onChange={(e) => onSearchEmailChange(e)}
      onCancel={() => onSearchEmailChange("")}
      style={{ height: "46px" }}
    />,
    <Button
      content={{ show: <FontAwesomeIcon icon={faEdit} color="white" /> }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={() => setView("create")}
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
          searchTerm={searchTerm}
        />
      ) : (
        <EmailView
          from={userFirstLastName(
            associationUsers.find((user) => user.user_id === view.author_id)
          )}
          date={view.creation_time}
          subject={view.message_subject}
          content={view.content}
          setView={setView}
        />
      )}
    </D>
  );
};

export default Email;
