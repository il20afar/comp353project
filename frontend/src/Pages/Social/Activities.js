import React from "react";
import {
  D,
  MainContext,
  TextBox,
  Button,
  Header,
  InputModal,
  data,
} from "../../imports";
import Chatbox from "../../Components/Chatbox/Chatbox";
import { v4 as uuid } from "uuid";
import DateTimePicker from "react-datetime-picker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Activities.scss";

const ActView = (props) => {
  // const {
  //   title,
  //   starting_time,
  //   ending_time,
  //   number_of_attendees,
  //   creator_username,
  //   onClick,
  // } = props;
  // return (
  //   <div className="act-view">
  //     <div className="act-name-container">
  //       <div className="thread-name-text">{showAct}</div>
  //     </div>
  //     <div className="threads-header-container">
  //       <div className="menu-toggle-container" onClick={(e) => setShowAct("")}>
  //         <div className="menu-toggle-icon">
  //           <FontAwesomeIcon icon={faHashtag} color="black" />
  //         </div>
  //         <div className="menu-toggle-text">&nbsp;Activities</div>
  //       </div>
  //     </div>
  //     <div className="box-container">
  //       <p>Title: {name}</p>
  //       <p>Description: {description}</p>
  //       <p>Starting Time: {startTime}</p>
  //       <p>Ending Time: {endTime}</p>
  //       <p>Date: {date}</p>
  //     </div>
  //   </div>
  // );
};

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

const Field = (key, title, content) => {
  return (
    <D key={`edit-info-field-${key}`} cn={`edit-info-field ${key}`}>
      <D cn="field-title">{title} </D>
      <div className="field-display">{content}</div>
    </D>
  );
};

const ActSpecific = (props) => {
  const { activity, user, setView } = props;

  const [inputModalView, setInputModalView] = React.useState("display");
  const [inputFields, setInputFields] = React.useState({
    title: "",
    starting_time: "",
    ending_time: "",
  });

  const fields = {
    title: "Title: ",
    starting_time: "Starting time: ",
    ending_time: "Ending time: ",
  };

  const onChange = (e) => {
    const val = e.target.value;

    setInputModalView(val !== "" ? "edit" : "display");
  };

  return (
    <InputModal
      view={inputModalView}
      isEditable={
        Number.parseInt(user.current.user_id) ===
        Number.parseInt(activity.creator_id)
      }
      widthPadding={100}
      heightPadding={100}
      onClose={() => setView("menu")}
      onConfirm={async () => {}}
    >
      <div className="content">
        {inputModalView === "display" ? <div></div> : null}
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
        <ActSpecific user={user} setView={setView} />
      ) : (
        <ActView showAct={view} />
      )}
    </D>
  );
};

export default Activities;
