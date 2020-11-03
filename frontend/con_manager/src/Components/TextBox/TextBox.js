import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { D } from "../../imports";
import "./TextBox.scss";
import "../../Styles/Utils.scss";

const Textbox = React.forwardRef((props, ref) => {
  const {
    type,
    placeholder,
    onChange = () => null,
    focusOnRender = false,
    className = "",
    initialValue,
    outlineOnChange = false,
  } = props;

  const [outlineState, setOutlineState] = React.useState("inactive");

  React.useEffect(() => {
    focusOnRender && ref.input.current.focus();
    if (initialValue) {
      ref.current.value = initialValue;
    }
  }, []);

  const onChangeHandler = (e) => {
    console.log("value", e.target.value);
    if (outlineOnChange) {
      setOutlineState(e.target.value !== initialValue ? "active" : "inactive");
    }
    onChange(e);
  };

  const onCancelClick = () => {
    ref.current.value = initialValue;
    onChange();
    setOutlineState("inactive");
  };

  return (
    <D cn={`textbox ${outlineState} ${className}`}>
      <D cn={`cancel-icon-container ${outlineState}`} onClick={onCancelClick}>
        <FontAwesomeIcon icon={faTimes} />
      </D>
      {((
        props = {
          ref: ref,
          className: "text-input",
          onChange: onChangeHandler,
          placeholder,
        }
      ) =>
        type !== "textarea" ? <input {...props} /> : <textarea {...props} />)()}
    </D>
  );
});

export default Textbox;
