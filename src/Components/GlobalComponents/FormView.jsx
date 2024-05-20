import React from 'react';
import FormFields from './FormFields';
import FormButtons from './FormButtons';
import useForm from '../hooks/useForm';

const FormView = ({ columns, record, onSave, onCancel }) => {
  const { formData, handleChange, handleSubmit } = useForm(record, onSave);

  return (
    <form onSubmit={handleSubmit}>
      <FormFields columns={columns} formData={formData} handleChange={handleChange} />
      <FormButtons onCancel={onCancel} />
    </form>
  );
};

export default FormView;
