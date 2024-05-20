import { useState, useEffect } from 'react';

const useSearch = (data, columns) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState(columns[0]?.searchKey || 'first_name');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false);

  useEffect(() => {
    const updateSuggestions = () => {
      const filteredSuggestions = [];
      const suggestionSet = new Set();

      data.forEach(item => {
        const value = item[searchColumn]?.toString().toLowerCase();
        if (value?.includes(searchTerm.toString().toLowerCase()) && !suggestionSet.has(value)) {
          suggestionSet.add(value);
          filteredSuggestions.push(item);
        }
      });

      setSuggestions(filteredSuggestions);
    };

    const updateFilteredData = () => {
      const filtered = data.filter(item =>
        item[searchColumn]?.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
      );
      setFilteredData(filtered);
    };

    if (!isSuggestionClicked) {
      updateSuggestions();
    }

    updateFilteredData();
  }, [searchTerm, searchColumn, data, isSuggestionClicked]);

  const clearSuggestions = () => setSuggestions([]);

  return {
    filteredData,
    searchTerm,
    searchColumn,
    suggestions,
    setSearchTerm,
    setSearchColumn,
    clearSuggestions,
    setIsSuggestionClicked
  };
};

export default useSearch;
