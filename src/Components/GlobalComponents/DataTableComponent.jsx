import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({ columns, data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState(columns[0]?.searchKey || "first_name");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const updateSuggestions = () => {
      const filteredSuggestions = [];
      const suggestionSet = new Set();

      data.forEach(item => {
        const value = item[searchColumn]?.toString().toLowerCase();
        if (value?.includes(searchTerm.toLowerCase()) && !suggestionSet.has(value)) {
          suggestionSet.add(value);
          filteredSuggestions.push(item);
        }
      });

      setSuggestions(filteredSuggestions);
    };

    const updateFilteredData = () => {
      const filtered = data.filter(item =>
        item[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    };

    updateSuggestions();
    updateFilteredData();
  }, [searchTerm, searchColumn, data]);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion[searchColumn]);
    const filtered = data.filter(item =>
      item[searchColumn]?.toString().toLowerCase() === suggestion[searchColumn].toLowerCase()
    );
    setFilteredData(filtered);
    setSuggestions([]);
  };

  const onColumnChange = (e) => {
    setSearchColumn(e.target.value);
    setSearchTerm("");
    searchRef.current.focus();
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <select
          className="form-select me-2"
          onChange={onColumnChange}
          value={searchColumn}
        >
          {columns.map((col, index) => (
            <option key={index} value={col.searchKey}>
              {col.name}
            </option>
          ))}
        </select>
        <div style={{ position: "relative" }}>
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
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
        striped
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "rgba(13, 34, 44, 1)",
              color: "white",
            },
          },
        }}
      />
    </>
  );
};

export default DataTableComponent;
