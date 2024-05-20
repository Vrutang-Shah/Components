import React from 'react';

const FormButtons = ({ onCancel }) => {
  return (
    <div className="form-buttons">
      <button type="submit" className="btn btn-primary me-2">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default FormButtons;
