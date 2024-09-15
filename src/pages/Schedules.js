import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import ScheduleForm from '../components/ScheduleForm';  // Import the form

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [openForm, setOpenForm] = useState(false);  // State for modal visibility
  const [selectedSchedule, setSelectedSchedule] = useState(null);  // State for editing
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await apiService.getSchedules();
      setSchedules(response.data);
    } catch (error) {
      console.error('Failed to fetch schedules', error);
    }
  };

  const handleAddNew = () => {
    setSelectedSchedule(null);  // Clear form data for new schedule
    setOpenForm(true);  // Open the modal
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);  // Set the selected schedule for editing
    setOpenForm(true);  // Open the modal
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteSchedule(id);
      setSchedules(schedules.filter((schedule) => schedule._id !== id));
    } catch (error) {
      console.error('Failed to delete schedule', error);
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);  // Close the modal
    fetchSchedules();  // Refresh the schedules list after form submission
  };

  // Handle navigation to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Container>
      <h2>Manage Schedules</h2>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Schedule
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={goToDashboard}
        style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}
      >
        Go to Dashboard
      </Button>


      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule._id}>
                <TableCell>{schedule.course.title}</TableCell>
                <TableCell>{new Date(schedule.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(schedule.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{schedule.students.map(student => student.name).join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(schedule)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(schedule._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Schedule Form Modal */}
      {openForm && (
        <ScheduleForm
          open={openForm}
          onClose={handleFormClose}
          initialData={selectedSchedule}  // Pass the schedule for editing
        />
      )}
    </Container>
  );
};

export default Schedules;
