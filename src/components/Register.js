import React, { useState, useContext } from 'react';
import { Button, TextField, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: '' });
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
