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
    initialValue = "",
    matchValue = "",
    placeholder,
    onChange = () => null,
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
  const whichRef = ref ?? defaultRef;

  const onChangeHandler = (e) => {
    const val = e.target[type === "input" ? "value" : "innerHTML"];
    console.log(val);
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
    whichRef.current.value = initialValue;
    onChange("");
    setOutlineState("inactive");
  };

  // React.useEffect(() => {
  //   // focusOnRender && ref.current.focus();
  //   // toggleOutlineState(initialValue);
  //   if (initialValue) {
  //     whichRef.current[type === "input" ? "value" : "innerHTML"] = initialValue;
  //   }
  // }, []);

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
          ref: whichRef,
          className: "text-input",
          placeholder: placeholder,
          value: initialValue,
          onChange: onChangeHandler,
          onKeyPress: onKeyPress,
          ...(type === "input" && { readOnly }),
          ...(type === "textarea" && { contentEditable: !readOnly }),
          ...(type === "textarea" && { onInput: onChangeHandler }),
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
