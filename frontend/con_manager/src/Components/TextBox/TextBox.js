import React from "react";
import { useEffect, forwardRef } from "react";
import { D } from "../../Utils/Utils";
import "./TextBox.scss";
import "../../Styles/Utils.scss";

const Textbox = forwardRef((props, ref) => {
  const { type, placeholder, onChange, focusOnRender = false } = props;

  useEffect(() => {
    focusOnRender && ref.input.current.focus();
  }, []);

  return (
    <D cn="textbox">
      {((
        props = {
          ref: ref,
          className: "text-input",
          onChange: onChange,
          placeholder,
        }
      ) =>
        type !== "textarea" ? (
          <input type={type} {...props} />
        ) : (
          <textarea {...props} />
        ))()}
    </D>
  );
});

export default Textbox;
