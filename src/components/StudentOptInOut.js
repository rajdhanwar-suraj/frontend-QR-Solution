import React, { useState } from 'react';
import apiService from '../services/apiService';

const StudentOptInOut = ({ studentId, scheduleId }) => {
    const [isOptedIn, setIsOptedIn] = useState(false);

    const handleOptInOut = async () => {
        try {
            if (isOptedIn) {
                await apiService.optOut(studentId, scheduleId);
                alert('Successfully opted out');
            } else {
                await apiService.optIn(studentId, scheduleId);
                alert('Successfully opted in');
            }
            setIsOptedIn(!isOptedIn);
        } catch (error) {
            console.error('Error opting in/out:', error);
        }
    };

    return (
        <button onClick={handleOptInOut}>
            {isOptedIn ? 'Opt Out' : 'Opt In'}
        </button>
    );
};

export default StudentOptInOut;
