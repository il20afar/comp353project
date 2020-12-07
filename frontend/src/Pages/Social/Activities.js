import React from "react";
import {
  D,
  MainContext,
  TextBox,
  Button,
  Header,
  InputModal,
  data,
  ConfirmDelete,
} from "../../imports";
import Chatbox from "../../Components/Chatbox/Chatbox";
import { v4 as uuid } from "uuid";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Activities.scss";

const Act = (props) => {
  const {
    title,
    starting_time,
    ending_time,
    number_of_attendees,
    onClick,
  } = props;
  return (
    <div className="act" onClick={onClick}>
      <div className="act-element-container title">
        <div>Title:&nbsp;</div>

        <div className="act-element title">{title}</div>
      </div>
      <div className="act-element-container startingtime">
        <div>Starting time:&nbsp;</div>

        <div className="act-element startingtime">
          <div>{starting_time}</div>
        </div>
      </div>
      <div className="act-element-container endingtime">
        <div>Ending time:&nbsp;</div>

        <div className="act-element endingtime">
          <div>{ending_time}</div>
        </div>
      </div>
      <div className="act-element-container numberppl">
        <div>
          <FontAwesomeIcon icon={faUser} />
          &nbsp;Number of attendees:
        </div>

        <div className="act-element numberppl">
          <div>{number_of_attendees}</div>
        </div>
      </div>
    </div>
  );
};

const Field = (props) => {
  const { key, title, content } = props;
  return (
    <div
      key={`edivit-info-fieldiv-${key}`}
      className={`edit-info-field ${key}`}
    >
      <div className="field-title">{title} </div>
      <div className="field-display">{content}</div>
    </div>
  );
};

const ActSpecific = (props) => {
  const {
    activity = {},
    user,
    setView,
    type = "display",
    updateActivities,
  } = props;

  const [inputModalView, setInputModalView] = React.useState(type);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({
    title: activity.title || "",
    activity_desc: activity.activity_desc || "",
    starting_time: activity.starting_time || "",
    ending_time: activity.ending_time || "",
    creator_username: activity.creator_username || "",
    number_of_attendees: activity.number_of_attendees || "",
  });

  const fields = {
    title: "Title: ",
    activity_desc: "Activity description: ",
    starting_time: "Starting time: ",
    ending_time: "Ending time: ",
    creator_username: "Creator username: ",
    number_of_attendees: "Number of attendees",
  };

  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;
    setInputValues(Object.assign({}, inputValues));
  };

  console.log(inputValues);

  return (
    <InputModal
      view={inputModalView}
      isEditable={false}
      isDeletable={false}
      widthPadding={200}
      heightPadding={180}
      onClose={() => setView("menu")}
      onDelete={() => {}}
      onConfirm={async () => {
        const params = {
          title: inputValues.title,
          activity_desc: inputValues.activity_desc,
          starting_time: inputValues.starting_time.format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          ending_time: inputValues.ending_time.format("YYYY-MM-DD HH:mm:ss"),
          creator_id: Number.parseInt(user.current.user_id),
          number_of_attendees: Number.parseInt(user.current.asso_id),
        };
        const res = await data.send("activities", "create", params);
        if (res === 1) {
          updateActivities();

          setView("menu");
        }
      }}
      onCancel={() => setInputModalView("display")}
      onEdit={() => setInputModalView("edit")}
    >
      <div className="content">
        {inputModalView === "display" ? (
          <>
            {Object.entries(fields).map(([key, val]) => {
              return <Field title={val} content={activity[key]} />;
            })}
          </>
        ) : (
          <>
            {Object.entries(fields).map(([key, val]) => {
              // console.log)()
              return (
                <Field
                  key={key}
                  title={val}
                  content={
                    key === "title" || key === "activity_desc" ? (
                      <TextBox
                        key={`email-input${key}`}
                        type={key === "title" ? "input" : "textarea"}
                        initialValue={inputValues[key]}
                        onChange={(newValue) =>
                          onInputValueChange(key, newValue)
                        }
                        onCancel={() => onInputValueChange(key, "")}
                        placeholder={`${val}`}
                        outlineOnChange
                        focusOnRender={true}
                        readOnly={false}
                        height={key === "title" ? "50px" : "fit-content"}
                      />
                    ) : key === "starting_time" || key === "ending_time" ? (
                      <Datetime
                        value={inputValues[key]}
                        onChange={(e) => {
                          console.log(e);
                          onInputValueChange(key, e);
                        }}
                      />
                    ) : key === "creator_username" ? (
                      user.current.username
                    ) : (
                      inputValues.number_of_attendees || 0
                    )
                  }
                />
              );
            })}
          </>
        )}
      </div>
    </InputModal>
  );
};

const ActMenu = (props) => {
  const { activities, setView } = props;

  return (
    <div className="act-menu">
      {activities.map((elem) => (
        <Act
          key={uuid()}
          title={elem.title}
          starting_time={elem.starting_time}
          ending_time={elem.ending_time}
          number_of_attendees={elem.number_of_attendees}
          onClick={() => setView(elem)}
        />
      ))}
    </div>
  );
};

const Activities = (props) => {
  const {} = props;
  const { user } = React.useContext(MainContext);
  const [view, setView] = React.useState("menu");

  const [activities, setActivities] = React.useState([]);

  const actions = [
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "fit-content",
      }}
    >
      <Button
        content={{ show: "Create +" }}
        style={{ show: { width: "200px" }, hide: { width: "200px" } }}
        onClick={() => setView("create")}
      />
    </div>,
  ];

  React.useEffect(() => {
    updateActivities();
  }, []);

  const updateActivities = async () => {
    const params = {
      user_id: Number.parseInt(user.current.user_id),
      asso_id: Number.parseInt(user.current.asso_id),
    };
    const res = await data.send("activities", "get", params);
    console.log(res, params);
    setActivities(res.activities);
  };

  console.log(activities);

  return (
    <D cn="act-page">
      {view === "menu" && (
        <Header keyName="threads-header" height="80px" actions={actions} />
      )}
      {view === "menu" ? (
        <ActMenu activities={activities || []} setView={setView} />
      ) : view === "create" ? (
        <ActSpecific
          user={user}
          setView={setView}
          type={"edit"}
          updateActivities={updateActivities}
        />
      ) : (
        <ActSpecific user={user} activity={view} setView={setView} />
      )}
    </D>
  );
};

export default Activities;
