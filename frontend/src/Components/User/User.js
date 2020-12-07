import React from "react";
import { D, TextBox, data } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./User.scss";
import "../../Styles/Utils.scss";
import aisle20copy from "./aisle20copy.jpg";

const UserIcon = (props) => {
  const {
    profilepic = <img src={aisle20copy} alt="user-picture-profile" />,
    ...rest
  } = props;
  return (
    <D cn="comp-user-icon" {...rest}>
      <D cn="user-icon-container">
        {profilepic}
        <D cn="preference-icon">
          <FontAwesomeIcon icon={faUserEdit} />
        </D>
      </D>
    </D>
  );
};

const UserModModal = (props) => {
  const { user, onClose } = props;
  const closeOrConfirm = React.useRef(null);
  const profilepic = <img src={aisle20copy} alt="user-picture-profile" />;

  const [inputValues, setInputValues] = React.useState({
    first_name: user.current.first_name,
    last_name: user.current.last_name,
    email: user.current.email,
    phone_number: user.current.phone_number,
    street: user.current.street,
    city: user.current.city,
    province: user.current.province,
    country: user.current.country,
  });
  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;
    setInputValues(Object.assign({}, inputValues));

    closeOrConfirm.current.className = `action-icon ${
      Object.entries(inputValues).filter(
        ([key, val]) => val !== user.current[key]
      ).length === 0
        ? "close"
        : "confirm"
    }`;
  };
  // const onChange = () => {
  //   const entries = Object.entries(inputValues).filter(
  //     ([key, val]) => val.current.value !== user.current[key]
  //   );

  //   closeOrConfirm.current.className = `action-icon ${
  //     entries.length === 0 ? "close" : "confirm"
  //   }`;
  // };

  const onConfirmChange = async () => {
    closeOrConfirm.current.className = `action-icon loading`;
    const params = {
      username: user.current.username,
      ...inputValues,
    };
    const res = await data.send("users", "modify", params);
    window.setTimeout(() => {
      if (res !== 0) {
        closeOrConfirm.current.className = "action-icon close";
        user.current = params;
        onClose(false);
      } else {
        closeOrConfirm.current.className = "action-icon confirm";

        // For now this does absolutely nothing
        // TODO: display some kind of "Invalid Credentials" alert
      }
    }, 0);
  };

  return (
    <D cn="user-container">
      <D className="user-edit-container">
        <D className="user-edit-window">
          <div className="content-container">
            {" "}
            <D cn="action-icon-container">
              <D ref={closeOrConfirm} cn={`action-icon close`}>
                <D cn="action-icon-wrapper close" onClick={() => onClose()}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </D>
                <D cn="action-icon-wrapper confirm" onClick={onConfirmChange}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </D>
                <D cn="action-icon-wrapper loading">
                  <FontAwesomeIcon icon={faSpinner} />
                </D>
              </D>
            </D>
            <D cn="username-container">{user.current.username}</D>
            <D cn="profilepicture-container">
              <D cn="profilepicture"> {profilepic}</D>
            </D>
            {[
              "First Name",
              "Last Name",
              "Email",
              "Phone Number",
              "Street",
              "City",
              "Province",
              "Country",
            ].map((elem) => {
              const keyword = elem.replace(" ", "_").toLowerCase();
              return (
                <D
                  key={`textinput-wrapper${keyword}`}
                  cn={`user-info-container ${keyword}`}
                >
                  <D cn="title"> {elem}</D>
                  <TextBox
                    key={`textinput${keyword}`}
                    type={"input"}
                    initialValue={inputValues[keyword]}
                    // matchValue={}
                    onChange={(e) => onInputValueChange(keyword, e)}
                    onCancel={() => onInputValueChange(keyword, "")}
                    outlineOnChange
                    focusOnRender={false}
                  />
                </D>
              );
            })}
          </div>
        </D>
      </D>
    </D>
  );
};

export { UserModModal, UserIcon };
