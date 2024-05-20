import React from 'react';

const FormFields = ({ columns, formData, handleChange }) => {
  return (
    <div className="form-fields">
      {columns.map((col) => (
        <div key={col.searchKey} className="mb-3">
          <label htmlFor={col.searchKey} className="form-label">
            {col.name}
          </label>
          <input
            type="text"
            className="form-control"
            id={col.searchKey}
            name={col.searchKey}
            value={formData[col.searchKey] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FormFields;
