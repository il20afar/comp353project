import React from "react";
import { D } from "../../../../imports";
import "./Reviews.scss";

const Reviews = (props) => {
  const { userReview } = props;
  const [state, setState] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = state;
    console.log("Final data is", data);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setState({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="Reviews">
      <h1>User Reviews</h1>
      <p>Review: {userReview} </p>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Users Review"
            value={userReview}
            name="userReview"
            onChange={handleInputChange}
          ></input>
        </p>
        <p>
          <button>Send Message</button>
        </p>
      </form>
    </div>
  );

  //return <D cn="Reviews"></D>;
};

export default Reviews;
