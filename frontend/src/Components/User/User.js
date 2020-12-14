import React from "react";
import { D, TextBox, data, ImageUpload, filesToBase64 } from "../../imports";
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
  const { type = "edit", user, onClose } = props;
  const closeOrConfirm = React.useRef(null);
  const profilepic = <img src={user.current.profile_picture} />;

  const uploadPictures = React.useRef([]);

  console.log(user.current);

  const [inputValues, setInputValues] = React.useState({
    username: user.current.username,
    pw: user.current.password,
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

  const onConfirmChange = async () => {
    closeOrConfirm.current.className = `action-icon loading`;

    if (type === "create") {
      const convertedPictures = await filesToBase64(uploadPictures.current);

      const params = {
        username: inputValues.username,
        pw: inputValues.pw,
        first_name: inputValues.first_name,
        last_name: inputValues.last_name,
        street: inputValues.street,
        city: inputValues.city,
        province: inputValues.province,
        country: inputValues.country,
        email: inputValues.email,
        phone_number: Number.parseInt(inputValues.phone_number),
        profile_picture: "/",
      };
      const res = await data.send("users", "create", params);
      console.log(res, params);
      if (res === 1) {
        closeOrConfirm.current.className = "action-icon close";
        onClose(false);
      } else {
        closeOrConfirm.current.className = "action-icon confirm";
      }
    } else {
      const { username, pw, ...rest } = inputValues;
      const params = {
        username: user.current.username,
        ...rest,
      };
      const res = await data.send("users", "modify", params);
      if (res !== 0) {
        closeOrConfirm.current.className = "action-icon close";
        user.current = params;
        onClose(false);
      } else {
        closeOrConfirm.current.className = "action-icon confirm";
      }
    }
  };

  return (
    <D cn="user-container">
      <D className="user-edit-container">
        <D className="user-edit-window">
          <div className="content-container">
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

            <div className="edit-info-container">
              <D cn="username-container">
                <div className="username-wrapper">
                  {type === "create" ? (
                    <div className="username-password-wrapper">
                      <D
                        key={`textinput-wrapperusername`}
                        cn={`user-info-container username`}
                      >
                        <D cn="title"> {"Username:"}</D>
                        <TextBox
                          key={`textinputusername`}
                          type={"input"}
                          initialValue={inputValues["username"]}
                          // matchValue={}
                          onChange={(e) => onInputValueChange("username", e)}
                          onCancel={() => onInputValueChange("username", "")}
                          outlineOnChange
                          focusOnRender={false}
                        />
                      </D>
                      <D
                        key={`textinput-wrapperpassword`}
                        cn={`user-info-container password`}
                      >
                        <D cn="title"> {"Password:"}</D>
                        <TextBox
                          key={`textinputpassword`}
                          type={"input"}
                          subType={"password"}
                          initialValue={inputValues["pw"]}
                          // matchValue={}
                          onChange={(e) => onInputValueChange("pw", e)}
                          onCancel={() => onInputValueChange("pw", "")}
                          outlineOnChange
                          focusOnRender={false}
                        />
                      </D>
                    </div>
                  ) : (
                    <D
                      key={`textinput-wrapperusername`}
                      cn={`user-info-container username`}
                    >
                      <D cn="title"> Username: </D>
                      {user.current.username}
                    </D>
                  )}
                </div>
              </D>
              <D cn="profilepicture-container">
                <div className="user-info-container">
                  <div className="title">Profile picture: </div>
                  <div className="content">
                    {type === "create" ? (
                      <ImageUpload
                        uploadPictures={uploadPictures}
                        defaultPictures={[]}
                        singleImage
                      />
                    ) : (
                      <D cn="profilepicture"> {profilepic}</D>
                    )}
                  </div>
                </div>
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
                      matchValue={keyword === "phone_number" ? "number" : null}
                      onChange={(e) => onInputValueChange(keyword, e)}
                      onCancel={() => onInputValueChange(keyword, "")}
                      outlineOnChange
                      focusOnRender={false}
                    />
                  </D>
                );
              })}
            </div>
          </div>
        </D>
      </D>
    </D>
  );
};

export { UserModModal, UserIcon };
