import React from "react";
import { D, TextBox, data, Button } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import "./InputModal.scss";
// import "../../Styles/Utils.scss";

const views = ["diplay", "edit"];

const AdDetail = (props) => {
  const {
    view = "display",
    onClose = () => null,
    onConfirm = () => null,
    onCancel = () => null,
    onEdit = () => null,
    onDelete = () => null,
    isEditable = true,
    isDeletable = false,
    widthPadding = 0,
    heightPadding = 50,
    children = null,
  } = props;

  return (
    <D cn="input-modal">
      <D
        className="edit-view-window"
        style={{
          width: `calc(100% - ${2 * widthPadding}px)`,
          height: `calc(100% - ${2 * heightPadding}px)`,
        }}
      >
        {isEditable && view === "display" && (
          <D cn="edit-icon-container">
            <D cn={`edit-icon`}>
              <D
                cn="edit-icon-wrapper close"
                onClick={() => {
                  onEdit();
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </D>
            </D>
          </D>
        )}
        {isDeletable && view === "edit" && (
          <D cn="delete-icon-container">
            <D cn={`delete-icon`}>
              <D cn="delete-icon-wrapper close" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </D>
            </D>
          </D>
        )}
        <D cn="action-icon-container">
          <D cn={`action-icon ${view === "edit" ? "confirm" : "close"}`}>
            <D
              cn="action-icon-wrapper close"
              onClick={() => (view !== "edit" ? onClose() : onCancel())}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </D>
            <D cn="action-icon-wrapper confirm" onClick={onConfirm}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </D>
            <D cn="action-icon-wrapper loading">
              <FontAwesomeIcon icon={faSpinner} />
            </D>
          </D>
        </D>
        <D cn={`content-container`}>{children}</D>
      </D>
    </D>
  );
};

export default AdDetail;
