import React from "react";
import "./Meetings.scss";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";

// const Meetings = (props) => {
//   const {} = props;

//   return <D cn="Meetings"></D>;
// };

class Meetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: momentJalaali() };
  }
  render() {
    return (
      <DatePicker
        value={this.state.value}
        onChange={(value) => this.setState({ value })}
      />
    );
  }
}

export default Meetings;
