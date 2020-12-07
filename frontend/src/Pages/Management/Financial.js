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
      <Con title="Special Contributors" onClick={setShowCon} />
    </div>
  );
};

const Con = (props) => {
  const { title, nameOfContributor, onClick, gridTemplateColumns } = props;
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
        <div className="thread-name-text"></div>
      </div>
      <div className="threads-header-container">
        <div className="menu-toggle-container" onClick={(e) => setShowCon("")}>
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Hide</div>
        </div>
      </div>
      <div className="box-container">
        <h1 className = "contri-title">Special Contributors: </h1>
        <p>Antoine Farley</p>
        <p>Maxim Pobudzey</p>
        <p>Rohhaan Thambithurai</p>
        <p>Tik Man Poon</p>
      </div>
    </div>
  );
};

const MaintMenu = (props) => {
  const { showMaint, setShowMaint } = props;

  return (
    <div className="act-menu">
      <Maint title="Maintainence and Repairs" onClick={setShowMaint} />
    </div>
  );
};

const Maint = (props) => {
  const { title, onClick, gridTemplateColumns } = props;
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
  const {
    rationales,
    dates,
    contractor,
    cost,
    showMaint,
    setShowMaint,
  } = props;

  return (
    <div className="con-view">
      <div className="con-name-container">
        <div className="thread-name-text"></div>
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
        <h1 className = "maint-title">Maintainence and Repairs</h1>
        <h1 className = "borderline"></h1>
        <p>Description: Repair of Broken Air Conditioning</p>
        <p>Date: 01/12/2020</p>
        <p>Contractor: Airvitech Inc.</p>
        <p>Cost: $1060</p>
        <h1 className = "borderline"></h1>
        <p>Description: Maintainence of Main Pipes of the Building</p>
        <p>Date: 24/11/2020</p>
        <p>Contractor: Ledcor Ip Holdings LTD</p>
        <p>Cost: $5200</p>
        <h1 className = "borderline"></h1>
        <p>Description: Repair of Damaged Bathtub</p>
        <p>Date: 16/12/2020</p>
        <p>Contractor: Tub Expert LTD</p>
        <p>Cost: $140</p>
      </div>
    </div>
  );
};

const Financial = (props) => {
  const {} = props;
  const [showCon, setShowCon] = React.useState("");
  const [showMaint, setShowMaint] = React.useState("");

  return (
    <GlobalProvider>
      <Header />
      <div>
        {showCon === "" ? (
          <ConMenu showCon={showCon} setShowCon={setShowCon} />
        ) : (
          <ConView
            nameOfContributor="Antoine"
            showCon={showCon}
            setShowCon={setShowCon}
          />
        )}

        {showMaint === "" ? (
          <MaintMenu showMaint={showMaint} setShowMaint={setShowMaint} />
        ) : (
          <MaintView
            rationales=""
            dates=""
            contractor=""
            cost=""
            showMaint={showMaint}
            setShowMaint={setShowMaint}
          />

        )}

        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
};

export default Financial;
