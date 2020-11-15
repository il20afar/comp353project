import React from "react";
import { useRef, useEffect } from "react";
import "./Textbox.scss";

const Textbox = (props) => {
  const { type, placeholder, buttonContent, onClick } = props;
  const refs = {
    input: useRef(null),
    button: useRef(null),
  };
  const getRef = (refName) => refs[refName].current;
  const textarea = type === "textarea";

  const setClass = (str) =>
    (getRef("button").className = `textbox-button ${str}`);
  const handlers = {
    previousVal: "",
    isShiftActive: false,
    onSend: (val = getRef("input").value) => {
      if (textarea && val === "") {
        return;
      }
      refs.input.current.value = "";
      setClass("unavailable");
      onClick(val);
    },
    onKeyDown: (e, k = e.key) => {
      if (k === "Shift") handlers.isShiftActive = true;
      else if (k === "Enter" && !handlers.isShiftActive) {
        e.preventDefault();
        handlers.onSend();
      }
    },
    onKeyUp: (e, k = e.key) => {
      if (k === "Shift") handlers.isShiftActive = false;
    },
    onChange: (e, val = e.target.value) => {
      textarea && setClass(val === "" ? "unavailable" : "");
    },
  };

  useEffect(() => {
    refs.input.current.focus();
  }, []);

  return (
    <div className="textbox-chatbox flex-row">
      <div className="textbox-wrapper">
        {((
          h = handlers,
          props = {
            ref: refs.input,
            className: "text-input",
            onKeyDown: h.onKeyDown,
            onKeyUp: h.onKeyUp,
            placeholder,
          }
        ) =>
          type === "input" ? (
            <input type="text" {...props} />
          ) : (
            <textarea onChange={handlers.onChange} {...props} />
          ))()}
        <div
          ref={refs.button}
          className={`textbox-button${
            type === "textarea" ? " unavailable" : ""
          }`}
          onClick={() => handlers.onSend()}
        >
          {buttonContent}
        </div>
      </div>
    </div>
  );
};

export default Textbox;
