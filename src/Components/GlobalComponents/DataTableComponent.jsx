import React, { useState } from 'react';
import useSearch from '../hooks/useSearch';
import SearchBar from './SearchBar';
import DataTableWrapper from './DataTableWrapper';
import FormView from './FormView';

const DataTableComponent = ({ columns, data }) => {
  const [dataState, setDataState] = useState(data);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    filteredData,
    searchTerm,
    searchColumn,
    suggestions,
    setSearchTerm,
    setSearchColumn,
    clearSuggestions,
    setIsSuggestionClicked,
  } = useSearch(dataState, columns);

  const onSearchChange = (e) => {
    setIsSuggestionClicked(false);
    setSearchTerm(e.target.value);
  };

  const onSuggestionClick = (suggestion) => {
    setIsSuggestionClicked(true);
    clearSuggestions();
    setSearchTerm(suggestion[searchColumn]);
  };

  const onColumnChange = (e) => {
    setSearchColumn(e.target.value);
    setSearchTerm('');
  };

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleNewClick = () => {
    setSelectedRecord({});
    setIsFormOpen(true);
  };

  const handleSave = (formData) => {
    let updatedData;
    if (selectedRecord && Object.keys(selectedRecord).length === 0) {
      // New record
      updatedData = [...dataState, formData];
    } else {
      // Existing record update
      updatedData = dataState.map((item) =>
        item.id === formData.id ? formData : item
      );
    }
    setDataState(updatedData);
    setIsFormOpen(false);
    setCurrentPage(Math.ceil(updatedData.length / 5)); // Assuming 5 items per page
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {isFormOpen ? (
        <FormView
          columns={columns}
          record={selectedRecord}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
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
          <button className="btn btn-primary mb-3" onClick={handleNewClick}>
            New Record
          </button>
          <DataTableWrapper
            columns={columns}
            data={filteredData}
            onRowClicked={handleRowClick}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default DataTableComponent;
