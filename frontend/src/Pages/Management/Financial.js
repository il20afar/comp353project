import React from "react";
import "./Financial.scss";
import AddTransaction from "../../Components/ExpenseTracker/AddTransaction";
import BBalance from "../../Components/ExpenseTracker/Balance";
import IncomeExpenses from "../../Components/ExpenseTracker/IncomeExpenses";
import TransactionList from "../../Components/ExpenseTracker/TransactionList";
import { GlobalProvider } from "../../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";

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
        <h1 className = "contri-title">Special Contributors of Repairs and Maintainence: </h1>
        <p>ZETA Maintainence LTD</p>
        <p>ACC International INC.</p>
        <p>MR HandyMan Canada</p>
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

const ConFeeMenu = (props) => {
  const { showConFee, setShowConFee } = props;

  return (
    <div className="act-menu">
      <Maint title="Current Fees of Condo Units" onClick={setShowConFee} />
    </div>
  );
};

const ConFee = (props) => {
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

const ConFeeView = (props) => {
  const {
    rationales,
    dates,
    contractor,
    cost,
    showConFee,
    setShowConFee,
  } = props;

  return (
    <div className="con-view">
      <div className="con-name-container">
        <div className="thread-name-text"></div>
      </div>
      <div className="threads-header-container">
        <div
          className="menu-toggle-container"
          onClick={(e) => setShowConFee("")}
        >
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Hide</div>
        </div>
      </div>
      <div className="box-container">
        <h1 className = "maint-title">Current Fees of Condo Units</h1>
        <h1 className = "borderline"></h1>
        <p>Condo ID: 01</p>
        <p>Pending Fee: $1250</p>
        <p>Due Date: 31/12/2020</p>
        <h1 className = "borderline"></h1>
      </div>
    </div>
  );
};

const BalanceMenu = (props) => {
  const { showBalance, setShowBalance } = props;

  return (
    <div className="act-menu">
      <Maint title="Balance and History of Paid Fee" onClick={setShowBalance} />
    </div>
  );
};

const Balance = (props) => {
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

const BalanceView = (props) => {
  const {
    showBalance,
    setShowBalance,
  } = props;

  return (
    <div className="con-view">
      <div className="con-name-container">
        <div className="thread-name-text"></div>
      </div>
      <div className="threads-header-container">
        <div
          className="menu-toggle-container"
          onClick={(e) => setShowBalance("")}
        >
          <div className="menu-toggle-icon">
            <FontAwesomeIcon icon={faHashtag} color="black" />
          </div>
          <div className="menu-toggle-text">&nbsp;Hide</div>
        </div>
      </div>
      <div className="box-container">
        <h1 className = "maint-title">Balance</h1>
        <p>Current Balance: $21050</p>
        <h1 className = "borderline"></h1>
        <h1 className = "maint-title">History of Paid Fee</h1>
        <h1 className = "borderline"></h1>
        <p>Transaction ID: 012</p>
        <p>Title: Repair fee of bathtub</p>
        <p>Amount: $2250</p>
        <p>Date: 07/12/2020</p>
        <h1 className = "borderline"></h1>
        <p>Transaction ID: 013</p>
        <p>Title: Regular Maintainence of the condos</p>
        <p>Amount: $3250</p>
        <p>Date: 11/12/2020</p>
        <h1 className = "borderline"></h1>
        <p>Transaction ID: 014</p>
        <p>Title: Monthly member fee </p>
        <p>Amount: $75</p>
        <p>Date: 11/12/2020</p>
        <h1 className = "borderline"></h1>
        <p>Transaction ID: 015</p>
        <p>Title: Repair fee of AC</p>
        <p>Amount: $2000</p>
        <p>Date: 13/12/2020</p>
      </div>
    </div>
  );
};

const Financial = (props) => {
  const {} = props;
  const [showCon, setShowCon] = React.useState("");
  const [showMaint, setShowMaint] = React.useState("");
  const [showConFee, setShowConFee] = React.useState("");
  const [showBalance, setShowBalance] = React.useState("");

  return (
    <GlobalProvider>
      <div>
      <Chart id = "1"/>
      <p className = "sep"></p>

      {showBalance === "" ? (
          <BalanceMenu showBalance={showBalance} setShowBalance={setShowBalance} />
        ) : (
          <BalanceView
            rationales=""
            dates=""
            contractor=""
            cost=""
            showBalance={showBalance}
            setShowBalance={setShowBalance}
          />

        )}

      {showConFee === "" ? (
          <ConFeeMenu showConFee={showConFee} setShowConFee={setShowConFee} />
        ) : (
          <ConFeeView
            rationales=""
            dates=""
            contractor=""
            cost=""
            showConFee={showConFee}
            setShowConFee={setShowConFee}
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
        {showCon === "" ? (
          <ConMenu showCon={showCon} setShowCon={setShowCon} />
        ) : (
          <ConView
            nameOfContributor="Antoine"
            showCon={showCon}
            setShowCon={setShowCon}
          />
        )}
      </div>
    </GlobalProvider>
  );
};

export default Financial;
