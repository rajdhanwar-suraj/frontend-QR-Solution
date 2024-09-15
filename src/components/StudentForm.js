import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const StudentForm = ({ onSubmit, editMode, currentStudent, courses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  useEffect(() => {
    if (editMode && currentStudent) {
      setFormData({
        name: currentStudent.name,
        email: currentStudent.email,
        phone: currentStudent.phone,
        course: currentStudent.course._id,
      });
    }
  }, [editMode, currentStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Student Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        select
        label="Course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        required
        fullWidth
      >
        {courses.map((course) => (
          <MenuItem key={course._id} value={course._id}>
            {course.title}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        {editMode ? 'Update Student' : 'Add Student'}
      </Button>
    </Box>
  );
};

export default StudentForm;
