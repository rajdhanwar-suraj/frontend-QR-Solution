import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.name);
        }
    }, [user]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {username ? username : 'Training Platform'}
                </Typography>

                {/* Check if user is logged in */}
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
