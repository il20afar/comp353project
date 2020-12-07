import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { D } from "../../imports";
import "./TextBox.scss";
import "../../Styles/Utils.scss";

const Textbox = React.forwardRef((props, ref) => {
  const {
    type,
    subType = "text",
    initialValue = "",
    matchValue = "",
    placeholder,
    onChange = () => null,
    onCancel = () => null,
    focusOnRender = false,
    outlineOnChange = false,
    match = null,
    height = null,
    readOnly,
    useAnimation = true,
    className = "",
    ...other
  } = props;

  const [outlineState, setOutlineState] = React.useState("inactive");

  const defaultRef = React.useRef(null);
  const defaultValue = React.useRef(initialValue);
  const whichRef = ref ?? defaultRef;

  const onChangeHandler = (e) => {
    const val = e.target[type === "input" ? "value" : "value"];

    toggleOutlineState(val);
    onChange(val);
  };

  const toggleOutlineState = (value) => {
    if (outlineOnChange) {
      setOutlineState(value !== matchValue ? "active" : "inactive");
    }
  };

  const onKeyPress = (e) => {
    const val = e.key;
    if (match === "number" && !val.match(/[0-9]{1}/)) {
      e.preventDefault();
    }
  };

  const onCancelClick = () => {
    // whichRef.current.value = initialValue;
    // onChange("");
    setOutlineState("inactive");
    onCancel();
  };

  React.useEffect(() => {
    // if (type === "textarea") whichRef.current.innerHTML = initialValue;
    focusOnRender && whichRef.current.focus();
  }, [initialValue]);

  return (
    <D
      cn={`textbox ${type} ${outlineState} ${className} ${
        useAnimation ? "animate" : ""
      }`}
      style={{ height: height }}
    >
      <D cn={`cancel-icon-container ${outlineState}`} onClick={onCancelClick}>
        <FontAwesomeIcon icon={faTimes} />
      </D>
      {((
        rest = {
          ref: whichRef,
          className: "text-input",
          placeholder: placeholder,
          value: initialValue,
          onChange: onChangeHandler,
          onKeyPress: onKeyPress,
          readOnly,
        }
      ) =>
        type !== "textarea" ? (
          <input type={subType} {...rest} {...other} />
        ) : (
          <TextareaAutosize minRows={1} {...rest} {...other} />
        ))()}
    </D>
  );
});

export default Textbox;
