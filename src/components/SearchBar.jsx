import React, { useRef } from "react";

function SearchBar({ onSearch }) {
  const searchRef = useRef(null);

  const handleChange = () => {
    onSearch(searchRef.current.value);
  };

  return (
    <input
      ref={searchRef}
      type="text"
      placeholder="Search tasks..."
      onChange={handleChange}
    />
  );
}

export default SearchBar;