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
    initialValue,
    outlineOnChange = false,
    match = null,
    height = null,
    ...other
  } = props;

  const [outlineState, setOutlineState] = React.useState("inactive");

  React.useEffect(() => {
    focusOnRender && ref.current.focus();
    if (initialValue) {
      ref.current.value = initialValue;
    }
  }, []);

  const onChangeHandler = (e) => {
    if (outlineOnChange) {
      setOutlineState(e.target.value !== initialValue ? "active" : "inactive");
    }
    onChange(e);
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
    onChange();
    setOutlineState("inactive");
  };

  return (
    <D cn={`textbox ${outlineState} ${className}`} style={{ height: height }}>
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
        }
      ) =>
        type !== "textarea" ? (
          <input type={subType} {...rest} {...other} />
        ) : (
          <textarea {...rest} {...other} />
        ))()}
    </D>
  );
});

export default Textbox;
