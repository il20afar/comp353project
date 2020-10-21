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
    password: useRef(null),
    adsButton: useRef(null),
    loginButton: useRef(null),
  };

  const isLoginEntered = () =>
    refs.username.current.value != "" && refs.password.current.value !== "";

  const handlers = {
    login: {
      onChange: () => {
        refs.loginButton.current.style.visibility = isLoginEntered()
          ? "visible"
          : "hidden";
      },
      onSubmit: () => {
        handleLogin(refs.username.current.value, refs.password.current.value);
      },
    },
    ads: {
      onClick: (e) => {
        toggleAds(!ads);
      },
    },
  };

  // Component mounted
  useEffect(()=>{
    const listenEnter = (e)=>{
      if(e.key==='Enter'){
        handlers.login.onSubmit();
      }
    }
    document.addEventListener('keyup', listenEnter);

    // Component unmounted
    return ()=>{
      document.removeEventListener('keyup', listenEnter);

    }
  })


  return (
    <D cn="login-container">
      {ads ? (
        <Listings ref={refs.adsButton} type={"full"} />
      ) : (
        <>
          <D cn="login-logo">CON MANAGER</D>
          <D cn="login">
            <D cn="login-inputs">
              {["username", "password"].map((x) => (
                <D key={x} cn="username-container">
                  <TextBox
                    type={x === "username" ? "input" : x}
                    ref={refs[x]}
                    placeholder={`${x[0].toUpperCase()}${x.slice(1)}`}
                    onChange={handlers.login.onChange}
                  />
                </D>
              ))}
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
