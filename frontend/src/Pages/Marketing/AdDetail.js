import React from "react";
import { D, TextBox, data } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./AdDetail.scss";
import "../../Styles/Utils.scss";

const fields = {
  title: "Title",
  ad_city: "City",
  ad_price: "Price",
  ad_desc: "Description",
  visibility: "Visibility",
};

const AdDetail = (props) => {
  const { ad, view, onClose, editable, user_id } = props;
  const [edit, setEdit] = React.useState(view === "create");

  const [refs, setRefs] = React.useState({
    title: React.useRef(null),
    ad_city: React.useRef(null),
    ad_price: React.useRef(null),
    ad_desc: React.useRef(null),
    visibility: React.useRef(null),
  });

  const onConfirmChange = async () => {
    const ifUpdateSuccessful = {
      title: refs.title.current.value,
      ad_city: refs.ad_city.current.value,
      ad_price: refs.ad_price.current.value,
      ad_type: "condo",
      ad_desc: refs.ad_desc.current.value,
      visibility: refs.visibility.current.value,
      pictures: "",
      visibility: "public",
      creator_id: user_id,
    };

    const res = await data.send("ads", "create", ifUpdateSuccessful);
    console.log("Create", res);
    window.setTimeout(() => {
      if (res !== 0) {
        setEdit(false);
        onClose();
      } else {
        setEdit(true);
      }
    }, 0);
  };

  const onDeleteRequest = async () => {
    const res = await data.send("ads", "delete", {
      ad_id: ad.ad_id,
    });
    console.log("Delete", res);
  };

  return (
    <D cn="edit-view">
      <D className="edit-view-window">
        {editable && !edit && (
          <D cn="edit-icon-container">
            <D cn={`edit-icon`}>
              <D cn="edit-icon-wrapper close" onClick={() => setEdit(!edit)}>
                <FontAwesomeIcon icon={faEdit} />
              </D>
            </D>
          </D>
        )}
        {editable && edit && (
          <D cn="delete-icon-container">
            <D cn={`delete-icon`}>
              <D cn="delete-icon-wrapper close" onClick={onDeleteRequest}>
                <FontAwesomeIcon icon={faTrash} />
              </D>
            </D>
          </D>
        )}
        <D cn="action-icon-container">
          <D cn={`action-icon ${!edit ? "close" : "confirm"}`}>
            <D
              cn="action-icon-wrapper close"
              onClick={() => (edit ? setEdit(false) : onClose())}
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
        <D cn="picture-container">
          <D cn="picture">
            <img src={ad.pictures.split(",")[0]} alt="ad-image" />
          </D>
        </D>
        <D cn={`edit-info-container ${edit ? "edit" : "display"}`}>
          {Object.entries(fields).map(([key, val]) => {
            return (
              <D key={uuid()} cn={`edit-info-field ${key}`}>
                <D cn="title"> {val}</D>
                <TextBox
                  type={key === "description" ? "textarea" : "input"}
                  ref={refs[key]}
                  initialValue={ad[key]}
                  outlineOnChange
                  focusOnRender={false}
                  readOnly={!edit}
                />
              </D>
            );
          })}
        </D>
      </D>
    </D>
  );
};

export default AdDetail;
