import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CourseForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        duration: initialData.duration,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data back to the parent component
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Course Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <TextField
        label="Duration (hours)"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="number"
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={onCancel} color="secondary" style={{ marginRight: '10px' }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};

export default CourseForm;
