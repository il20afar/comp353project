import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { D } from "../../imports";
import "./TextBox.scss";
import "../../Styles/Utils.scss";

const Textbox = React.forwardRef((props, ref) => {
  const {
    type,
    subType = "text",
    placeholder,
    onChange = () => null,
    focusOnRender = false,
    className = "",
    initialValue = "",
    outlineOnChange = false,
    match = null,
    height = null,
    readOnly,
    useAnimation = true,
    ...other
  } = props;

  const [outlineState, setOutlineState] = React.useState("inactive");

  React.useEffect(() => {
    focusOnRender && ref.current.focus();
    toggleOutlineState(initialValue);
    if (initialValue) {
      ref.current[type === "input" ? "value" : "innerHTML"] = initialValue;
    }
  }, []);

  const onChangeHandler = (e) => {
    toggleOutlineState(e.target.value);
    onChange(e.target.value);
  };

  const toggleOutlineState = (value) => {
    if (outlineOnChange) {
      setOutlineState(value !== initialValue ? "active" : "inactive");
    }
  };

  const onKeyPress = (e) => {
    const val = e.key;
    if (match === "number" && !val.match(/[0-9]{1}/)) {
      e.preventDefault();
      // if (!val.match(/[0-9]+[.]{0,1}[0-9]+/)[0].length !== val.length) {
      //   e.stopPropagation();
      // }
    }
  };

  const onCancelClick = () => {
    ref.current.value = initialValue;
    onChange("");
    setOutlineState("inactive");
  };

  return (
    <D
      cn={`textbox ${outlineState} ${className} ${
        useAnimation ? "animate" : ""
      }`}
      style={{ height: height }}
    >
      <D cn={`cancel-icon-container ${outlineState}`} onClick={onCancelClick}>
        <FontAwesomeIcon icon={faTimes} />
      </D>
      {((
        rest = {
          ref: ref,
          className: "text-input",
          placeholder: placeholder,
          onChange: onChangeHandler,
          onKeyPress: onKeyPress,
          ...(type === "input" && { readOnly }),
          ...(type === "textarea" && { contentEditable: !readOnly }),
        }
      ) =>
        type !== "textarea" ? (
          <input type={subType} {...rest} {...other} />
        ) : (
          <div {...rest} {...other} />
        ))()}
    </D>
  );
});

export default Textbox;
