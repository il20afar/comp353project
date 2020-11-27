import React, { useReducer, useState } from "react";
import "./Email.scss";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function Email() {
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
      <h1>Send an Email</h1>
      {submitting && (
        <div>
          You are submitting the following email:
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
        //fieldset for reicipient details(thier email)
        <fieldset>
          <label>
            <p>Send to: </p>
            <input name="name" onChange={handleChange} />
          </label>
        </fieldset>
        //fieldset for messages (message to send to someone else's email)
        <fieldset>
          <label>
            <p>Message</p>
            <textarea name="issue" rows="7" cols="100" onChange={handleChange}>
              Message...
            </textarea>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Email;
