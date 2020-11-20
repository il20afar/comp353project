import React from "react";
import "./Financial.scss";
import AddTransaction from "../../../../Components/ExpenseTracker/AddTransaction";
import Balance from "../../../../Components/ExpenseTracker/Balance";
import Header from "../../../../Components/ExpenseTracker/Header";
import IncomeExpenses from "../../../../Components/ExpenseTracker/IncomeExpenses";
import TransactionList from "../../../../Components/ExpenseTracker/TransactionList";
import { GlobalProvider } from "../../../../context/GlobalState";

class Financial extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GlobalProvider>
        <Header />
        <div>
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>
    );
  }
}

export default Financial;
