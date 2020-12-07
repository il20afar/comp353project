import React, { useReducer, useState } from "react";
import { MainContext } from "../../AppContainer/AppContainer";
import {
  data,
  InputModal,
  TextBox,
  Button,
  userFirstLastName,
} from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Reviews.scss";

const Field = (props) => {
  const { title, content } = props;
  return (
    <div
      key={`edivit-info-fieldiv-${title}`}
      className={`edit-info-field ${title}`}
    >
      <div className="field-title">{title} </div>
      <div className="field-display">{content}</div>
    </div>
  );
};

const Reviews = (props) => {
  const { user } = React.useContext(MainContext);

  const [view, setView] = React.useState("writing");

  const [isSendActive, setIsSendActive] = React.useState(false);

  const [inputValues, setInputValues] = React.useState({
    review_category: "Staff And Administration",
    subject: "",
    message: "",
  });
  const [associationAdmin, setAssociationAdmin] = React.useState([]);

  const onInputValueChange = (eventKey, newValue) => {
    inputValues[eventKey] = newValue;
    setInputValues(Object.assign({}, inputValues));
    setIsSendActive(Object.values(inputValues).every((elem) => elem !== ""));
  };

  const onEmailSubmit = async () => {
    const email = {
      message_subject: `(Review - ${inputValues.review_category}) ${inputValues.subject}`,
      content: inputValues.message,
      author_id: Number.parseInt(user.current.user_id),
      recipient_id: Number.parseInt(associationAdmin.admin_id),
    };

    const res = await data.send("messages", "create", email);

    if (res === 1) {
      setView("sent");
      setInputValues({
        review_category: "Staff And Administration",
        subject: "",
        message: "",
      });
      setIsSendActive(false);
    }
  };

  const updateAssociationAdmin = async () => {
    const res = await data.send("associations", "get_admin", {
      asso_id: user.current.asso_id,
    });

    setAssociationAdmin(res);
  };

  // Gets available association users
  React.useEffect(() => {
    updateAssociationAdmin();
  }, []);

  return view === "sent" ? (
    <div className="message-sent-container">
      <div className="message-sent-wrapper">
        <div className="send-another-text">
          Your review has been sent successfully!
        </div>
        <Button
          className={`send-review-button active`}
          content={{
            show: (
              <div className="send-review-content-container">
                <span>Send Another</span>
                <div className="send-review-icon-container">
                  <FontAwesomeIcon icon={faRedo} color="white" />
                </div>
              </div>
            ),
          }}
          onClick={() => setView("writing")}
        />
      </div>
    </div>
  ) : (
    <InputModal
      view={"display"}
      type="relative"
      isEditable={false}
      isCloseable={false}
      widthPadding={90}
      heightPadding={0}
      onCancel={() => setView("menu")}
      onClose={() => setView("menu")}
      onConfirm={async () => {}}
    >
      <div className="email-controls">
        <div className="left-container">
          <div className="top-container">
            <Field
              key={"to"}
              title={"To:"}
              content={
                <>
                  <span
                    style={{ color: "rgb(109, 109, 255)", fontStyle: "italic" }}
                  >
                    {associationAdmin?.admin_username}
                  </span>
                  &nbsp;(Association Admin)
                </>
              }
            />
            <div className="selected-recipients-container"></div>
            <Button
              className={`send-review-button ${
                isSendActive ? "active" : "inactive"
              }`}
              content={{
                show: (
                  <div className="send-review-content-container">
                    <span>Send Review</span>
                    <div className="send-review-icon-container">
                      <FontAwesomeIcon icon={faPaperPlane} color="white" />
                    </div>
                  </div>
                ),
              }}
              onClick={() => (isSendActive ? onEmailSubmit() : null)}
            />
          </div>

          <div className="bottom-container">
            <Field
              key={"reviewcategory"}
              title={"Review category:"}
              content={((
                options = [
                  { elem: "Staff and Administration", eventKey: "staffadmin" },
                  { elem: "Health and Safety", eventKey: "healthsafety" },
                  { elem: "Billing and Pricing", eventKey: "billingpricing" },
                ]
              ) => (
                <Button
                  content={{ show: inputValues.review_category }}
                  dropdown={options}
                  onSelect={(e) =>
                    onInputValueChange(
                      "review_category",
                      options.find((option) => option.eventKey === e).elem
                    )
                  }
                />
              ))()}
            />
            <Field
              key={"message_subject"}
              title={"Message subject:"}
              content={
                <TextBox
                  key={`email-input${"subject"}`}
                  type={"input"}
                  initialValue={inputValues["subject"]}
                  onChange={(newValue) =>
                    onInputValueChange("subject", newValue)
                  }
                  className={"subject"}
                  placeholder={`Please enter a message subject...`}
                  outlineOnChange
                  focusOnRender={"subject" === "to"}
                  readOnly={false}
                  height="50px"
                />
              }
            />
          </div>
        </div>
        ,
      </div>
      <ReactQuill
        theme="snow"
        value={inputValues.message || ""}
        placeholder="Please enter a message content..."
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
        onChange={(content) =>
          onInputValueChange(
            "message",
            content === "<p><br></p>" ? "" : content
          )
        }
        style={{ width: "100%", height: "100%" }}
      />
    </InputModal>
  );
};
export default Reviews;
