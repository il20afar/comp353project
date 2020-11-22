import React from "react";
import "./Meetings.scss";
import Agenda from "../../../../Components/Agenda/Agenda";

class Meetings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Agenda />;
  }
}

export default Meetings;
