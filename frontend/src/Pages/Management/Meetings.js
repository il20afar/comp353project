import React from "react";
import { Agenda } from "../../imports";
import "./Meetings.scss";

class Meetings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Agenda />;
  }
}

export default Meetings;
