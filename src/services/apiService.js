import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

// Get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Add Authorization header with the token
const withAuth = (config = {}) => {
  const token = getToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};

// Auth API
const login = (data) => axios.post(`${apiUrl}/auth/login`, data);
const register = (data) => axios.post(`${apiUrl}/auth/register`, data);

// Courses API
const getCourses = () => axios.get(`${apiUrl}/courses`, withAuth());
const createCourse = (data) => axios.post(`${apiUrl}/courses`, data, withAuth());
const updateCourse = (id, data) => axios.put(`${apiUrl}/courses/${id}`, data, withAuth());
const deleteCourse = (id) => axios.delete(`${apiUrl}/courses/${id}`, withAuth());

// Students API
const getStudents = () => axios.get(`${apiUrl}/students`, withAuth());
const createStudent = (data) => axios.post(`${apiUrl}/students`, data, withAuth());
const updateStudent = (id, data) => axios.put(`${apiUrl}/students/${id}`, data, withAuth());
const deleteStudent = (id) => axios.delete(`${apiUrl}/students/${id}`, withAuth());

// Schedules API
const getSchedules = () => axios.get(`${apiUrl}/schedules`, withAuth());
const createSchedule = (data) => axios.post(`${apiUrl}/schedules`, data, withAuth());
const updateSchedule = (id, data) => axios.put(`${apiUrl}/schedules/${id}`, data, withAuth());
const deleteSchedule = (id) => axios.delete(`${apiUrl}/schedules/${id}`, withAuth());

export default {
  login,
  register,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
