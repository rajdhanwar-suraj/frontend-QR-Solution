import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Box, IconButton, Modal } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import apiService from '../services/apiService';
import StudentForm from '../components/StudentForm';
import { useNavigate } from 'react-router-dom';


const Students = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null); // For editing
  const navigate = useNavigate();


  useEffect(() => {
    fetchStudents();
    fetchCourses(); // Fetching available courses
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiService.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await apiService.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleAddOrUpdateStudent = async (studentData) => {
    try {
      if (editMode && currentStudent) {
        await apiService.updateStudent(currentStudent._id, studentData);
      } else {
        await apiService.createStudent(studentData);
      }
      setModalOpen(false);
      fetchStudents();
      setEditMode(false);
      setCurrentStudent(null);
    } catch (error) {
      console.error('Failed to add/update student', error);
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  };

  // Handle navigation to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Container>
      <Box mt={4}>
        <h2>Students</h2>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Add Student
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.course.title}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(student)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(student._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modal for the form */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={{ margin: '100px auto', width: 400, padding: 20, backgroundColor: 'white' }}>
            <StudentForm
              onSubmit={handleAddOrUpdateStudent}
              editMode={editMode}
              currentStudent={currentStudent}
              courses={courses} // Passing courses to the form
            />
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default Students;
