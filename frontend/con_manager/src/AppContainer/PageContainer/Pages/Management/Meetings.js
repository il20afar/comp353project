import React from "react";
import "./Meetings.scss";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import Agenda from "../../../../Components/Agenda/Agenda";

// const Meetings = (props) => {
//   const {} = props;

//   return <D cn="Meetings"></D>;
// };

class Meetings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Agenda />;
  }
}

export default Meetings;
