import { useState, useEffect } from 'react';

const useForm = (initialData, onSave) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
