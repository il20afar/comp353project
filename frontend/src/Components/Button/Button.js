import React from "react";
import { D } from "../../imports";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./Button.scss";
import "../../Styles/Utils.scss";

const Dropdown = (props) => {
  const { elements = null, onSelect } = props;
  return (
    <div className="dropdown-container">
      {elements.map((elem) => (
        <div
          key={uuid()}
          className="dropdown-element"
          onClick={() => onSelect(elem.eventKey)}
        >
          {elem.elem}
        </div>
      ))}
    </div>
  );
};

const Button = (props) => {
  const {
    type = "static",
    style = { show: {}, hide: {} },
    content = { show: "SHOW", hide: "HIDE" },
    dropdown,
    onClick = (value) => null,
    onSelect,
    size = "md",
    className,
  } = props;

  const [show, setShow] = React.useState(true);

  const handlers = {
    onClick: (e) => {
      onClick(!show);
      setShow(!show);
      type === "dynamic" && setShow(!show);
    },
    onSelect: (eventKey) => {
      setShow(!show);
      onSelect(eventKey);
    },
  };

  return (
    <D
      cn={`button ${type} ${show ? "show" : "hide"}${
        dropdown ? " dropdown" : ""
      } ${size} ${className}`}
      onClick={handlers.onClick}
      style={show ? style.show : style.hide ?? style.show}
    >
      {show ? content.show : content.hide ?? content.show}
      {!show && dropdown && (
        <Dropdown elements={dropdown} onSelect={handlers.onSelect} />
      )}
      {dropdown && (
        <div className={`icon-container ${show ? "show" : "hide"}`}>
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      )}
    </D>
  );
};

export default Button;
