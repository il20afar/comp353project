import React from "react";
import { D, MainContext, TextBox, RowElem } from "../../imports";
import Chatbox from "../../Components/Chatbox/Chatbox";
import { v4 as uuid } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Activities.scss";

const ActView = (props) => {
  const { name, description, startTime, endTime, date, showAct, setShowAct } = props;

  return (
    <div className="act-view">
      <div className="act-name-container">
        <div className="thread-name-text">{showAct}</div>
      </div>
      <div className="threads-header-container">
        <div
          className="menu-toggle-container"
          onClick={(e) => setShowAct("")}
        >
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Activities</div>
        </div>
      </div>
      <div className="box-container">
        <p>Title: {name}</p>
        <p>Description: {description}</p>
        <p>Starting Time: {startTime}</p>
        <p>Ending Time: {endTime}</p>
        <p>Date: {date}</p>
      </div>
    </div>
  );
};

const acts = [
  "Christmas Dinner",
  "Christmas Brunch",
  "Christmas Tea",
  "Christmas Party",
  "New-Year Brunch",
];


const Act = (props) => {
  const {
    name,
    participants,
    date,
    createdBy,
    onClick,
    gridTemplateColumns,
  } = props;
  return (
    <div
      className="act"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(name)}
    >
      <div className="act-element-container name">
        <div className="act-element name">{name}</div>
      </div>
      <div className="act-element-container date">
        <div className="act-element date">
          <div>Activity Date: </div>
          <div>{date}</div>
        </div>
      </div>
      <div className="act-element-container created-by">
        <div className="act-element created-by">
          <div>Created by: </div>
          <div>&nbsp;&nbsp;{createdBy}</div>
        </div>
      </div>
      <div className="act-element-container numberppl">
        <div className="act-element numberppl">
          <FontAwesomeIcon icon={faUser} />
          <div>&nbsp;&nbsp;{participants}</div>
        </div>
      </div>
    </div>
  );
};

const ActMenu = (props) => {
  const { showAct, setShowAct } = props;

  React.useEffect(() => {
    const max = 12 * Math.max(...acts.map((elem) => elem.length));
    console.log(max);
  }, []);
  const max = 11.38 * Math.max(...acts.map((elem) => elem.length));

  return (
    <div className="act-menu">
      {acts.map((elem, index) => (
        <Act
          key={uuid()}
          name={elem}
          participants={index * 18}
          date="10-10-10 12:38pm"
          createdBy="afar"
          onClick={setShowAct}
          gridTemplateColumns={`minmax(300px, ${max}px) minmax(0px, 300px) minmax(0px,300px) minmax(60px, 80px)`}
        />
      ))}
    </div>
  );
};

const Activities = (props) => {
  const {} = props;
  const { user } = React.useContext(MainContext);

  const [showAct, setShowAct] = React.useState("");

  console.log(showAct);
  return (
    <D cn="act-page">
      {showAct === "" ? (
        <ActMenu showAct={showAct} setShowAct={setShowAct} />
      ) : (
        <ActView showAct={showAct} setShowAct={setShowAct} />
      )}
    </D>
  );
};

export default Activities;