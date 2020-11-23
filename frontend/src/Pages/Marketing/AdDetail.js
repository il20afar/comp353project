import React from "react";
import { D, TextBox, data } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./AdDetail.scss";
import "../../Styles/Utils.scss";

const AdDetail = (props) => {
  const { ad, onClose } = props;
  const closeOrConfirm = React.useRef(null);
  const [refs, setRefs] = React.useState({
    ad_id: React.useRef(null),
    title: React.useRef(null),
    city: React.useRef(null),
    price: React.useRef(null),
    description: React.useRef(null),
    visibility: React.useRef(null),
  });

  const onChange = () => {
    const entries = Object.entries(refs).filter(([key, val]) => {
      console.log(key, val.current.value, ad.current[key]);
      return val.current.value !== ad.current([key]);
    });
    console.log(entries);
    closeOrConfirm.current.className = `action-icon ${
      entries.length === 0 ? "close" : "confirm"
    }`;
  };

  console.log("RENDER");

  const onConfirmChange = async () => {
    closeOrConfirm.current.className = `action-icon loading`;
    const ifUpdateSuccessful = {
      ad_id: refs.adId.current.value,
      title: refs.title.current.value,
      city: refs.city.current.value,
      price: refs.price.current.value,
      description: refs.description.current.value,
      visibility: refs.visibility.current.value,
    };

    const res = await data.send("ads", "edit", ifUpdateSuccessful);
    window.setTimeout(() => {
      console.log(res);

      if (res !== 0) {
        closeOrConfirm.current.className = "action-icon close";
        ad.current = ifUpdateSuccessful;
        onClose(false);
      } else {
        closeOrConfirm.current.className = "action-icon confirm";

        // For now this does absolutely nothing
        // TODO: display some kind of "Invalid Credentials" alert
      }
    }, 0);
  };

  return (
    <D cn="edit-view">
      <D className="edit-view-window">
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
        <D cn="picture-container">
          <D cn="picture">
            <img src={ad.current.img} alt="ad-image" />
          </D>
        </D>
        <D cn="edit-info-container">
          {["Ad Id", "Title", "City", "Price", "Description", "Visibility"].map(
            (elem) => {
              const keyword = elem.replace(" ", "_").toLowerCase();
              return (
                <D key={uuid()} cn={`edit-info-field ${keyword}`}>
                  <D cn="title"> {elem}</D>
                  <TextBox
                    type={"input"}
                    ref={refs[keyword]}
                    initialValue={ad.current[keyword]}
                    onChange={onChange}
                    outlineOnChange
                    focusOnRender={false}
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
