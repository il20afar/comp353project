import React from "react";

import { Button } from "../../../imports";

import { v4 as uuid } from "uuid";

import "./AdThumbnail.scss";

const AdThumbnail = (props) => {
  const { type, images, title, city, price } = props;

  const Field = (props) => {
    const { title, content } = props;
    return (
      <div className="field-container">
        <div className="field-title">{title}:</div>
        <div className="field-content">{content}</div>
      </div>
    );
  };

  const AdThumbnailContainer = () => {
    return (
      <div className="thumbnail-container">
        <div className="image-container">
          <img src={images} />
        </div>

        <div className="content-container">
          <Field title="Title" content={title} />
          <Field title="City" content={city} />
          <Field title="Price" content={`$${price}`} />
        </div>
      </div>
    );
  };

  return (
    <Button
      className={`ad-thumbnail ${type}`}
      content={{ show: <AdThumbnailContainer /> }}
      onClick={() => null}
    />
  );
};

export default AdThumbnail;
