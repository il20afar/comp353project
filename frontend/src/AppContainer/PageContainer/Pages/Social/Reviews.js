import React, { useReducer, useState } from "react";
import "./Reviews.scss";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function Reviews() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="wrapper">
      <h1>Issues and Concerns</h1>
      {submitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset>
          <label>
            <p>Specify which department you have an issue/concern with:</p>
            <select name="type" onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="staff">Staff/Administation</option>
              <option value="health">Health & Safety</option>
              <option value="billing">Billing and Pricing</option>
            </select>
          </label>
          <label>
            <p>Issue or Concern</p>
            <textarea name="issue" rows="7" cols="100" onChange={handleChange}>
              Please specify your concern here
            </textarea>
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Reviews;
