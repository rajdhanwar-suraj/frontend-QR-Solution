import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import CourseForm from '../components/CourseForm';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null); // For editing
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await apiService.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleAddCourse = () => {
    setSelectedCourse(null); // Ensure no course is selected
    setOpenForm(true); // Open the modal
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setOpenForm(true); // Open the modal
  };

  const handleDeleteCourse = async (id) => {
    try {
      await apiService.deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error('Failed to delete course', error);
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setSelectedCourse(null);
  };

  const handleFormSubmit = async (courseData) => {
    try {
      if (selectedCourse) {
        // Editing existing course
        await apiService.updateCourse(selectedCourse._id, courseData);
      } else {
        // Adding new course
        await apiService.createCourse(courseData);
      }
      fetchCourses();
      handleFormClose();
    } catch (error) {
      console.error('Failed to submit course', error);
    }
  };

   // Handle navigation to dashboard
   const goToDashboard = () => {
    navigate('/dashboard');
  };


  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4">Courses</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCourse}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          Add Course
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={goToDashboard}
          style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}
        >
          Go to Dashboard
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.duration} hours</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditCourse(course)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCourse(course._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Course Form Modal */}
        <Dialog open={openForm} onClose={handleFormClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
          <DialogContent>
            <CourseForm
              initialData={selectedCourse}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Courses;
