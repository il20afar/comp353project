import React from "react";
import { forwardRef, useState, useEffect, useRef } from "react";

import { D } from "../../Utils/Utils";

import TextBox from "../../Components/TextBox/TextBox";
import Button from "../../Components/Button/Button";

import "../../Styles/Utils.scss";
import "./LoginContainer.scss";

import images from "../../condo_pictures/images";

const Condo = (props) => {
  const { picture, price, city } = props;
  return (
    <D cn="condo-container">
      <D cn="condo-picture">{picture}</D>
      <D cn="condo-price"> {price}</D>
      <D cn="condo-city"> {city}</D>
    </D>
  );
};

const Listings = (props) => {
  const { type } = props;
  const cities = [
    "Toronto",
    "Montreal",
    "Calgary",
    "Edmonton",
    "Ottawa",
    "Vancouver",
  ];
  const prices = [
    "10 000 000",
    "1 000 000",
    "500 000",
    "325 000",
    "3 000 000",
    "39 000 000",
  ];
  return (
    <D cn={`listing-container ${type}`}>
      {images.map((elem, index) => (
        <Condo
          key={prices[index]}
          picture={elem}
          price={`${prices[index]}$`}
          city={cities[index]}
        />
      ))}
    </D>
  );
};

const LoginContainer = (props) => {
  const { handleLogin } = props;
  const [ads, toggleAds] = useState(false);
  const refs = {
    username: useRef(null),
    pw: useRef(null),
    adsButton: useRef(null),
    loginButton: useRef(null),
  };

  const isLoginEntered = () =>
    refs.username.current.value != "" && refs.pw.current.value !== "";

  const handlers = {
    login: {
      onChange: () => {
        refs.loginButton.current.style.visibility = isLoginEntered()
          ? "visible"
          : "hidden";
      },
      onSubmit: () => {
        handleLogin(refs.username.current.value, refs.pw.current.value);
      },
    },
    ads: {
      onClick: (e) => {
        toggleAds(!ads);
      },
    },
  };

  return (
    <D cn="login-container">
      {ads ? (
        <Listings ref={refs.adsButton} type={"full"} />
      ) : (
        <>
          <D cn="login-logo">CON MANAGER</D>
          <D cn="login">
            <D cn="login-inputs">
              <D cn="username-container">
                <TextBox
                  type="input"
                  ref={refs.username}
                  placeholder="Username/Email"
                  onChange={handlers.login.onChange}
                />
              </D>
              <D cn="password-container">
                <TextBox
                  type="password"
                  ref={refs.pw}
                  placeholder="Password"
                  onChange={handlers.login.onChange}
                />
              </D>
            </D>
            <D
              ref={refs.loginButton}
              cn="button-container"
              style={{ visibility: "hidden" }}
            >
              <Button
                content={{ show: "LOGIN" }}
                onClick={handlers.login.onSubmit}
              />
            </D>
          </D>
        </>
      )}
      <D cn="ads-button">
        <Button
          type={"dynamic"}
          content={{ show: "Ads", hide: "X" }}
          style={{
            show: {
              width: "140px",
              backgroundColor: "transparent",
              borderRadius: "5px",
              padding: "10px",
            },
            hide: {
              width: "140px",
              backgroundColor: "transparent",
              borderColor: "black",
              fontSize: "50px",
              padding: "10px",
              color: "black",
            },
          }}
          onClick={handlers.ads.onClick}
        />
        <D cn="listing-preview">
          <Listings ref={refs.adsButton} type={"preview"} />
        </D>
      </D>
    </D>
  );
};

export default LoginContainer;
