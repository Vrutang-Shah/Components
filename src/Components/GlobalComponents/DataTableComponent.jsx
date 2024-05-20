import React from "react";
import useSearch from "../hooks/useSearch";
import SearchBar from "./SearchBar";
import DataTableWrapper from "./DataTableWrapper";

const DataTableComponent = ({ columns, data }) => {
  const {
    filteredData,
    searchTerm,
    searchColumn,
    suggestions,
    setSearchTerm,
    setSearchColumn,
  } = useSearch(data, columns);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion[searchColumn]);
  };

  const onColumnChange = (e) => {
    setSearchColumn(e.target.value);
    setSearchTerm("");
  };

  return (
    <>
      <SearchBar
        columns={columns}
        onSearchChange={onSearchChange}
        onColumnChange={onColumnChange}
        searchTerm={searchTerm}
        searchColumn={searchColumn}
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
      />
      <DataTableWrapper columns={columns} data={filteredData} />
    </>
  );
};

export default DataTableComponent;
