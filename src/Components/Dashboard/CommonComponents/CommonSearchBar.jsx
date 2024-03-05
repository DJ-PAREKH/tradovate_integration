import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const CommonSearchBar = ({ onSearch }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="search-addon">
          <FaSearch />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e) => onSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default CommonSearchBar;
