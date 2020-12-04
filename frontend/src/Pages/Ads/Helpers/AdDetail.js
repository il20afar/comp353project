import React from "react";
import { D, TextBox, data, Button } from "../../../imports";
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

const fields = {
  title: "Title",
  ad_city: "City",
  ad_price: "Price",
  ad_desc: "Description",
  visibility: "Visibility",
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render() {
    console.log(this.state.pictures);
    return (
      <ImageUploader
        withIcon={true}
        withPreview
        defaultImages={this.props.defaultImages}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}

const ImageCarousel = (props) => {
  const { pictures } = props;
  console.log(pictures);
  return (
    <Carousel>
      {pictures.map((elem) => (
        <div className="img-container" key={uuid()}>
          <img alt="" src={elem} />
          <p className="legend">
            {elem.replace("http://localhost:3001/backend/condo_pictures/", "")}
          </p>
        </div>
      ))}
    </Carousel>
  );
};

const AdDetail = (props) => {
  const { ad, view, onClose, onEdit, editable, user_id } = props;
  const [edit, setEdit] = React.useState(view === "create");
  const [visiblity, setVisibility] = React.useState("public");

  const [refs, setRefs] = React.useState({
    title: React.useRef(null),
    ad_city: React.useRef(null),
    ad_price: React.useRef(null),
    ad_desc: React.useRef(null),
    visibility: React.useRef(null),
  });

  const picturesArray = ad.pictures.replace(" ", "").split(",");

  const onConfirmChange = async () => {
    const updatedAd = {
      title: refs.title.current.value,
      ad_city: refs.ad_city.current.value,
      ad_price: Number.parseInt(refs.ad_price.current.value),
      ad_desc: refs.ad_desc.current.value,
      visibility: visiblity,
      pictures: "/pic.jpg",
      creator_id: Number.parseInt(user_id),
      ad_type: "condo",
    };

    const res = await data.send("ads", view, {
      ...(view === "edit" && { ad_id: Number.parseInt(ad.ad_id) }),
      title: refs.title.current.value,
      ad_type: "condo",
      ad_desc: refs.ad_desc.current.value,
      ad_price: Number.parseInt(refs.ad_price.current.value),
      ad_city: "Montreal",
      visibility: visiblity,
      pictures: "/some/path",
      ...(view === "create" && { creator_id: Number.parseInt(user_id) }),
    });

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

  return (
    <D cn="edit-view">
      <D className="edit-view-window">
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
            <ImageUpload defaultImages={picturesArray} />
          ) : (
            <ImageCarousel pictures={picturesArray} />
          )}{" "}
        </D>
        <D cn={`edit-info-container ${edit ? "edit" : "display"}`}>
          {Object.entries(fields).map(([key, val]) => {
            return (
              <D key={uuid()} cn={`edit-info-field ${key}`}>
                <D cn="title"> {val}</D>
                {edit && key === "visibility" ? (
                  <Button
                    content={{ show: visiblity, hide: "√" }}
                    dropdown={[
                      { elem: "Classified", eventKey: "classified" },
                      { elem: "General", eventKey: "general" },
                      { elem: "Public", eventKey: "public" },
                    ]}
                    onSelect={(eventKey) => setVisibility(eventKey)}
                  />
                ) : (
                  <TextBox
                    type={key === "ad_desc" ? "textarea" : "input"}
                    ref={refs[key]}
                    initialValue={ad[key]}
                    outlineOnChange
                    focusOnRender={false}
                    readOnly={!edit}
                    match={key === "ad_price" ? "number" : null}
                  />
                )}
              </D>
            );
          })}
        </D>
      </D>
    </D>
  );
};

export default AdDetail;
