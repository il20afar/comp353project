import React from "react";
import "./Financial.scss";
import AddTransaction from "../../Components/ExpenseTracker/AddTransaction";
import Balance from "../../Components/ExpenseTracker/Balance";
import Header from "../../Components/ExpenseTracker/Header";
import IncomeExpenses from "../../Components/ExpenseTracker/IncomeExpenses";
import TransactionList from "../../Components/ExpenseTracker/TransactionList";
import { GlobalProvider } from "../../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ConMenu = (props) => {
  const { showCon, setShowCon } = props;
  
  return (
    <div className="act-menu">
  <Con title = "Special Contributors" 
  onClick={setShowCon}
  />
    </div>
  );
}


const Con = (props) => {
  const {
    title,
    nameOfContributor,
    onClick,
    gridTemplateColumns,
  } = props;
  return (
    <div
      className="contri"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(title)}
    >
      <div className="contri-element-container title">
        <div className="contri-element title">{title}</div>
      </div>
    </div>
  );
};

const ConView = (props) => {
  const { nameOfContributor, showCon, setShowCon } = props;

  return (
    <div className="con-view">
      <div className="con-name-container">
        <div className="thread-name-text">{showCon}</div>
      </div>
      <div className="threads-header-container">
        <div
          className="menu-toggle-container"
          onClick={(e) => setShowCon("")}
        >
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Hide</div>
        </div>
      </div>
      <div className="box-container">
        <p>Special Contributors: </p>
        <p>{nameOfContributor}</p>
        <p>{nameOfContributor}</p>
        <p>{nameOfContributor}</p>
        <p>{nameOfContributor}</p>
        <p>{nameOfContributor}</p>
      </div>
    </div>
  );
};

const MaintMenu = (props) => {
  const { showMaint, setShowMaint } = props;
  
  return (
    <div className="act-menu">
  <Maint title = "Maintainence and Repairs" 
  onClick={setShowMaint}
  />
    </div>
  );
}

const Maint = (props) => {
  const {
    title,
    onClick,
    gridTemplateColumns,
  } = props;
  return (
    <div
      className="contri"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(title)}
    >
      <div className="contri-element-container title">
        <div className="contri-element title">{title}</div>
      </div>
    </div>
  );
};

const MaintView = (props) => {
  const { rationales, dates, contractor, cost,showMaint ,setShowMaint } = props;

  return (
    <div className="con-view">
      <div className="con-name-container">
        <div className="thread-name-text">{showMaint}</div>
      </div>
      <div className="threads-header-container">
        <div
          className="menu-toggle-container"
          onClick={(e) => setShowMaint("")}
        >
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Hide</div>
        </div>
      </div>
      <div className="box-container">
        <p>Description: {rationales}</p>
        <p>Date: {dates}</p>
        <p>Contractor: {contractor}</p>
        <p>Cost: {cost}</p>
      </div>
    </div>
  );
};


const Financial = (props) => {
  
  const {} = props;
  const [showCon, setShowCon] = React.useState("");
  const [showMaint, setShowMaint] = React.useState("");
  console.log(showCon);

    return (
      <GlobalProvider>
        <Header />
        <div>
        {showCon === "" ? (
        <ConMenu showCon={showCon} setShowCon={setShowCon} />
      ) : (
        <ConView nameOfContributor = "Antoine" showCon={showCon} setShowCon={setShowCon} />
      )}

    {showMaint === "" ? (
        <MaintMenu showMaint={showMaint} setShowMaint={setShowMaint} />
      ) : (
        <MaintView 
        rationales = "Someone shit too much and block the whole dirty water pumping system of the bulding" 
        dates = "4/6/1989"
        contractor = "CCP Pumping Company"
        cost = "198964 Cad"
        showMaint={showMaint} setShowMaint={setShowMaint} />
      )}


          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>
    );
  }


export default Financial;
