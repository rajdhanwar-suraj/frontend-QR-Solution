import React from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <h1>Training Platform Dashboard</h1>
            <Grid container spacing={3}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => navigate('/courses')}>
                        Manage Courses
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => navigate('/students')}>
                        Manage Students
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => navigate('/schedules')}>
                        Manage Schedules
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
