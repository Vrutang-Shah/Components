import React, { useEffect, useRef } from "react";

const SearchBar = ({ columns, onSearchChange, onColumnChange, searchTerm, searchColumn, suggestions, onSuggestionClick }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, [searchColumn]);

  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="flex-grow-1 me-2" style={{ maxWidth: "200px" }}>
        <select
          className="form-select"
          onChange={onColumnChange}
          value={searchColumn}
        >
          {columns.map((col, index) => (
            <option key={index} value={col.searchKey}>
              {col.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow-1" style={{ position: "relative" }}>
        <input
          type="search"
          className="form-control"
          placeholder="Search here..."
          value={searchTerm}
          onChange={onSearchChange}
          ref={searchRef}
        />
        {suggestions.length > 0 && searchTerm && (
          <ul style={{ position: "absolute", zIndex: 1, listStyle: "none", background: "white", width: "100%", padding: 0, margin: 0, border: "1px solid #ccc" }}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion[searchColumn]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
