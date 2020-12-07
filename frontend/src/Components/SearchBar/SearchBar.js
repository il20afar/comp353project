import React from "react";
import { TextBox } from "../../imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";
import "../../Styles/Utils.scss";

const SearchBar = (props) => {
  const {
    placeholder = "",
    initialValue = null,
    onChange = () => null,
    onCancel = () => null,
    ...rest
  } = props;

  const ref = React.useRef(null);

  return (
    <div className="searchbar" {...rest}>
      <TextBox
        ref={ref}
        type="input"
        placeholder={placeholder}
        initialValue={initialValue}
        outlineOnChange
        onChange={onChange}
        onCancel={onCancel}
      />
      <div className="menu-search-icon">
        <FontAwesomeIcon icon={faSearch} color="black" size="sm" />
      </div>
    </div>
  );
};

export default SearchBar;
