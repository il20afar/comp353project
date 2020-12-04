import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadContainer = (props) => {
  const { style, ...rest } = props;
  return (
    <div
      className="load-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Loader style={{ margin: "0 auto", ...rest }} {...rest} />
    </div>
  );
};

export default LoadContainer;
