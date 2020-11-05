import React from "react";
import "./Condo.scss";

const Condo = (props) => {
  return (
    <div className="condo">
      <button className="box">
        <img className="img" src={props.img} />
        <div className="content">
          <p>{props.city} </p>
          <p>{props.price} </p>
        </div>
      </button>
    </div>
  );
};

export default Condo;
