import React from "react";
import { D } from "../../imports";
import "./Button.scss";
import "../../Styles/Utils.scss";

const Dropdown = (props) => {
  const { elements = null, onSelect } = props;
  return (
    <div className="dropdown-container">
      {elements.map((elem) => (
        <div
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
      } ${size}`}
      onClick={handlers.onClick}
      style={show ? style.show : style.hide ?? style.show}
    >
      {show ? content.show : content.hide ?? content.show}
      {!show && dropdown && (
        <Dropdown elements={dropdown} onSelect={handlers.onSelect} />
      )}
    </D>
  );
};

export default Button;
