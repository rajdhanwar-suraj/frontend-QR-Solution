import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import apiService from '../services/apiService';

const ScheduleForm = ({ open, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    course: '',
    startDate: '',
    endDate: '',
    students: []
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchCourses();

    // If initialData is provided, set form data for editing
    if (initialData) {
      setFormData({
        course: initialData.course._id,
        startDate: new Date(initialData.startDate).toISOString().split('T')[0],
        endDate: new Date(initialData.endDate).toISOString().split('T')[0],
        students: initialData.students.map(student => student._id)
      });
    }
  }, [initialData]);

  const fetchStudents = async () => {
    try {
      const response = await apiService.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await apiService.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, students: typeof value === 'string' ? value.split(',') : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await apiService.updateSchedule(initialData._id, formData);
        alert('Schedule updated successfully!');
      } else {
        await apiService.createSchedule(formData);
        alert('Schedule created successfully!');
      }
      onClose();  // Close the modal after submission
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Schedule' : 'Create Schedule'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Course"
          name="course"
          select
          fullWidth
          value={formData.course}
          onChange={handleChange}
          margin="normal"
        >
          {courses.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          fullWidth
          value={formData.startDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          fullWidth
          value={formData.endDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Students</InputLabel>
          <Select
            label="Students"
            name="students"
            multiple
            value={formData.students}
            onChange={handleStudentChange}
            renderValue={(selected) => selected.map(id => {
              const student = students.find(student => student._id === id);
              return student ? student.name : '';
            }).join(', ')}
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                <Checkbox checked={formData.students.indexOf(student._id) > -1} />
                <ListItemText primary={student.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">{initialData ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleForm;
