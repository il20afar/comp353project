import React from "react";
import { data, InputModal, Button } from "../../imports";

const ConfirmDelete = (props) => {
  const { onConfirm, onCancel, isCloseable = true } = props;

  return (
    <InputModal
      type={"absolute"}
      key="view-input-modal"
      view={"display"}
      isEditable={false}
      widthPadding={200}
      heightPadding={200}
      onConfirm={onConfirm}
      onClose={onCancel}
      onCancel={onCancel}
      isCloseable={isCloseable}
    >
      <div
        style={{
          color: "ghostwhite",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Are you sure you want to delete the association?
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          content={{
            show: "Cancel",
          }}
          style={{
            show: {
              height: "70px",
              margin: "10px",
              width: "100px",
              border: "4px solid rgba(163, 101, 163, 1)",
              backgroundColor: "transparent",
              color: "rgba(163, 101, 163, 1)",
            },
          }}
          // dropdown={[]}
          onClick={onCancel}
        />
        <Button
          content={{
            show: "Delete",
          }}
          style={{
            show: {
              height: "70px",

              margin: "10px",
              width: "100px",
              border: "4px solid rgba(163, 101, 163, 1)",
              backgroundColor: "transparent",
              color: "rgba(163, 101, 163, 1)",
            },
          }}
          // dropdown={[]}
          height="100px"
          onClick={onConfirm}
        />
      </div>
    </InputModal>
  );
};

export default ConfirmDelete;
