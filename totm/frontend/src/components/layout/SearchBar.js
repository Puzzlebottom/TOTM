import React from "react";

export default function SearchBar({ stateName, onChange }) {
  return (
    <input
      type="search"
      className="form-control py-0 px-2 m-0"
      placeholder="Search by name"
      aria-label="Search"
      name={stateName || "searchField"}
      onChange={onChange}
    />
  );
}
