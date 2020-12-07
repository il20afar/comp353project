import React from "react";
import { userFirstLastName } from "../../imports";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import { v4 as uuid } from "uuid";

import "./UserList.scss";

const UserList = (props) => {
  const {} = props;

  const { associationUsers, onTypeAheadChange } = props;

  return (
    <Typeahead
      id={uuid()}
      onChange={(selected) => onTypeAheadChange(selected)}
      placeholder="To:"
      options={
        associationUsers
          ? associationUsers.map((user) => ({
              id: user.user_id,
              label: userFirstLastName(user),
            }))
          : ["no matches"]
      }
      selected={null}
    />
  );
};

export default UserList;
