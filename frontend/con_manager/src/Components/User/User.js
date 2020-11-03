import React from "react";
import { D, TextBox, data } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./User.scss";
import "../../Styles/Utils.scss";
import aisle20copy from "./aisle20copy.jpg";

const User = (props) => {
  const { user } = props;
  const [show, setShow] = React.useState(false);
  const closeOrConfirm = React.useRef(null);
  const profilepic = <img src={aisle20copy} alt="user-picture-profile" />;

  const refs = {
    firstname: React.useRef(null),
    lastname: React.useRef(null),
    email: React.useRef(null),
    phoneno: React.useRef(null),
    address: React.useRef(null),
    city: React.useRef(null),
    province: React.useRef(null),
    country: React.useRef(null),
  };

  const onChange = (e) => {
    const entries = Object.entries(refs).filter(
      ([key, val]) => val.current.value !== user[key]
    );
    closeOrConfirm.current.className = `action-icon ${
      entries.length === 0 ? "close" : "confirm"
    }`;
  };

  const onConfirmChange = async () => {
    closeOrConfirm.current.className = `action-icon loading`;
    const userIfUpdateSuccessful = {
      username: user.username,
      firstname: refs.firstname.current.value,
      lastname: refs.lastname.current.value,
      email: refs.email.current.value,
      phoneno: Number.parseInt(refs.phoneno.current.value),
      address: refs.address.current.value,
      city: refs.city.current.value,
      province: refs.province.current.value,
      country: refs.country.current.value,
    };
    const res = await data.send("user", "modify", userIfUpdateSuccessful);
    window.setTimeout(() => {
      console.log(res);

      if (res !== 0) {
        closeOrConfirm.current.className = "action-icon close";
        user.current = userIfUpdateSuccessful;
        setShow(false);
      } else {
        closeOrConfirm.current.className = "action-icon confirm";

        // For now this does absolutely nothing
        // TODO: display some kind of "Invalid Credentials" alert
      }
    }, 0);
  };

  return (
    <D cn="user-container">
      {show ? (
        <D className="user-edit-container">
          <D className="user-edit-window">
            <D cn="action-icon-container">
              <D ref={closeOrConfirm} cn={`action-icon close`}>
                <D
                  cn="action-icon-wrapper close"
                  onClick={() => setShow(!show)}
                >
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
              "PhoneNo",
              "Address",
              "City",
              "Province",
              "Country",
            ].map((elem) => {
              const keyword = elem.replace(" ", "").toLowerCase();
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
      ) : (
        <D cn="user-icon-container" onClick={() => setShow(!show)}>
          {profilepic}
          <D cn="preference-icon">
            <FontAwesomeIcon icon={faUser} />
          </D>
        </D>
      )}
    </D>
  );
};

export default User;
