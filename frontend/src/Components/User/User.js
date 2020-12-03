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

  const refs = {
    first_name: React.useRef(null),
    last_name: React.useRef(null),
    email: React.useRef(null),
    phone_number: React.useRef(null),
    street: React.useRef(null),
    city: React.useRef(null),
    province: React.useRef(null),
    country: React.useRef(null),
  };

  const onChange = () => {
    const entries = Object.entries(refs).filter(
      ([key, val]) => val.current.value !== user.current[key]
    );

    closeOrConfirm.current.className = `action-icon ${
      entries.length === 0 ? "close" : "confirm"
    }`;
  };

  const onConfirmChange = async () => {
    closeOrConfirm.current.className = `action-icon loading`;
    const userIfUpdateSuccessful = {
      username: user.current.username,
      first_name: refs.first_name.current.value,
      last_name: refs.last_name.current.value,
      email: refs.email.current.value,
      phone_number: Number.parseInt(refs.phone_number.current.value),
      street: refs.street.current.value,
      city: refs.city.current.value,
      province: refs.province.current.value,
      country: refs.country.current.value,
    };
    const res = await data.send("users", "modify", userIfUpdateSuccessful);
    window.setTimeout(() => {
      if (res !== 0) {
        closeOrConfirm.current.className = "action-icon close";
        user.current = userIfUpdateSuccessful;
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
              <D key={uuid()} cn={`user-info-container ${keyword}`}>
                <D cn="title"> {elem}</D>
                <TextBox
                  type={"input"}
                  ref={refs[keyword]}
                  initialValue={user.current[keyword]}
                  onChange={onChange}
                  outlineOnChange
                  focusOnRender={false}
                />
              </D>
            );
          })}
        </D>
      </D>
    </D>
  );
};

export { UserModModal, UserIcon };
