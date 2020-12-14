import React from "react";
import {
  D,
  TextBox,
  data,
  Button,
  filesToBase64,
  LoadContainer,
  userFirstLastName,
} from "../../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import ImageUploader from "react-images-upload";

import { v4 as uuid } from "uuid";

import "./AdDetail.scss";
import "../../../Styles/Utils.scss";
import { MainContext } from "../../../AppContainer/AppContainer";

const fields = {
  title: "Title",
  ad_city: "City",
  ad_price: "Price",
  ad_desc: "Description",
  visibilityType: "Visibility",
};

export const ImageUpload = (props) => {
  const { defaultImages, uploadPictures } = props;
  const [pictures, setPictures] = React.useState([]);

  const onDrop = (picture) => {
    uploadPictures.current = picture;

    setPictures([...pictures, picture]);
  };

  return (
    <ImageUploader
      {...props}
      withIcon={true}
      withPreview
      defaultImages={defaultImages}
      buttonText="Choose images"
      onChange={onDrop}
      imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
    />
  );
};

const ImageCarousel = (props) => {
  const { pictures } = props;

  return (
    <Carousel>
      {pictures.map((elem) => (
        <div className="img-container" key={uuid()}>
          <img alt="" src={elem} />
        </div>
      ))}
    </Carousel>
  );
};

const AdDetail = (props) => {
  const { type = "condo", ad, view, onClose, onEdit, editable } = props;
  const { user } = React.useContext(MainContext);
  const { user_id, asso_id } = user.current || {};
  const [edit, setEdit] = React.useState(view === "create");

  const [inputValues, setInputValues] = React.useState({
    title: ad.title,
    ad_city: ad.ad_city,
    ad_price: ad.ad_price,
    ad_desc: ad.ad_desc,
    visibilityType: type === "condo" ? "public" : "item",
  });

  const [username, setUsername] = React.useState();

  const uploadPictures = React.useRef(
    ad.pictures ? ad.pictures.replace(" ", "").split(",") : []
  );
  const loadContainerRef = React.useRef(null);

  const picturesArray = ad.pictures
    ? ad.pictures.replace(" ", "").split(",")
    : [];

  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;
    setInputValues(Object.assign({}, inputValues));
  };

  const onConfirmChange = async () => {
    loadContainerRef.current.classList.remove("hide");
    const convertedPictures = await filesToBase64(uploadPictures.current);

    const adsParam = {
      ...(view === "edit" && { ad_id: Number.parseInt(ad.ad_id) }),
      title: inputValues.title,
      ad_type:
        type === "condo"
          ? "condo"
          : inputValues.visibilityType === "item"
          ? "item_sale"
          : "service",
      ad_desc: inputValues.ad_desc,
      ad_price: Number.parseInt(inputValues.ad_price),
      ad_city: "Montreal",
      visibility:
        type === "posting"
          ? "public"
          : inputValues.visibilityType === "public"
          ? "public"
          : Number.parseInt(asso_id),
      pictures: convertedPictures.length === 0 ? [] : convertedPictures,
      ...(view === "create" && { creator_id: Number.parseInt(user_id) }),
    };

    const res = await data.send("ads", view, adsParam);

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
    const res = await data.send("ads", "remove", {
      ad_id: Number.parseInt(ad.ad_id),
    });

    onClose();
  };

  const getUsers = async () => {
    const res = await data.send("users", "get");

    setUsername(
      userFirstLastName(
        ad.creator_id
          ? res.users.find((elem) => elem.user_id === ad.creator_id)
          : user.current
      )
    );
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <D cn="edit-view">
      <D className="edit-view-window">
        <div className="creator-username">
          <span className="username-title">Owner:</span>
          <span className="separator" />
          <span className="username">{username}</span>
        </div>
        {editable && !edit && (
          <D cn="edit-icon-container">
            <D cn={`edit-icon`}>
              <D
                cn="edit-icon-wrapper close"
                onClick={() => {
                  onEdit();
                  setEdit(!edit);
                }}
              >
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
              onClick={() =>
                edit && view !== "create" ? setEdit(false) : onClose()
              }
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
          {edit ? (
            <ImageUpload
              defaultImages={picturesArray}
              uploadPictures={uploadPictures}
            />
          ) : (
            <ImageCarousel pictures={picturesArray} />
          )}
        </D>
        <D cn={`edit-info-container ${edit ? "edit" : "display"}`}>
          {Object.entries(fields).map(([key, val]) => {
            return (
              <D key={`edit-info-field${key}`} cn={`edit-info-field ${key}`}>
                <D cn="title">
                  {" "}
                  {key === "visibilityType"
                    ? type === "posting" && "Ad type"
                    : val}
                </D>
                {edit && key === "visibilityType" ? (
                  <Button
                    content={{
                      show: inputValues.visibilityType,
                      hide: "√",
                    }}
                    dropdown={
                      type === "condo"
                        ? [
                            { elem: "Classified", eventKey: "classified" },
                            { elem: "Public", eventKey: "public" },
                          ]
                        : [
                            { elem: "Item", eventKey: "item" },
                            { elem: "Service", eventKey: "service" },
                          ]
                    }
                    onSelect={(eventKey) => {
                      onInputValueChange("visibilityType", eventKey);
                    }}
                  />
                ) : (
                  <TextBox
                    key={`textbox-field${key}`}
                    type={
                      key === "ad_desc" || key == "title" ? "textarea" : "input"
                    }
                    initialValue={inputValues[key]}
                    placeholder={key === "ad_price" ? "Numbers only" : ""}
                    outlineOnChange
                    focusOnRender={false}
                    onChange={(e) => onInputValueChange(key, e)}
                    onCancel={() => onInputValueChange(key, "")}
                    readOnly={!edit}
                    match={key === "ad_price" ? "number" : null}
                    maxLength={
                      key === "ad_price" ? 9 : key === "ad_desc" ? 1000 : null
                    }
                  />
                )}
              </D>
            );
          })}
        </D>
        <div ref={loadContainerRef} className="edit-view-loading hide">
          <LoadContainer
            type="ThreeDots"
            color="rgb(98,96,186)"
            height="100px"
            width="100px"
          />
        </div>
      </D>
    </D>
  );
};

export default AdDetail;
