import React from "react";
import { D, TextBox, data } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./AdDetail.scss";
import "../../Styles/Utils.scss";

const AdDetail = (props) => {
  const { ad, view, onClose, onConfirm, editable } = props;
  const [edit, setEdit] = React.useState(false);

  const [refs, setRefs] = React.useState({
    ad_id: React.useRef(null),
    title: React.useRef(null),
    city: React.useRef(null),
    price: React.useRef(null),
    description: React.useRef(null),
    visibility: React.useRef(null),
  });

  console.log("RENDER");

  const onConfirmChange = async () => {
    // closeOrConfirm.current.className = `action-icon loading`;
    const ifUpdateSuccessful = {
      ad_id: refs.adId.current.value,
      title: refs.title.current.value,
      city: refs.city.current.value,
      price: refs.price.current.value,
      description: refs.description.current.value,
      visibility: refs.visibility.current.value,
    };

    const res = await data.send("ads", view, ifUpdateSuccessful);
    window.setTimeout(() => {
      console.log(res);

      if (res !== 0) {
        setEdit(false);
        onClose(false);
      } else {
        setEdit(true);
      }
    }, 0);
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
          {["Ad Id", "Title", "City", "Price", "Description", "Visibility"].map(
            (elem) => {
              const keyword = elem.replace(" ", "_").toLowerCase();
              return (
                <D key={uuid()} cn={`edit-info-field ${keyword}`}>
                  <D cn="title"> {elem}</D>
                  <TextBox
                    type={keyword === "description" ? "textarea" : "input"}
                    ref={refs[keyword]}
                    initialValue={ad[keyword]}
                    outlineOnChange
                    focusOnRender={false}
                    readOnly={!edit}
                  />
                </D>
              );
            }
          )}
        </D>
      </D>
    </D>
  );
};

export default AdDetail;
