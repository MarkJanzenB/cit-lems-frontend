import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import MyPaper from "../../../MyPaper.jsx";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';

const subjects = [
    { value: 'Biology', label: 'Biology' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
];

const sections = [
    { value: 'A', label: 'Year 1 - Section A' },
    { value: 'B', label: 'Year 1 - Section B' },
    { value: 'C', label: 'Year 2 - Section C' },
];

const rooms = [
    { value: 'Room 1', label: 'Laboratory Room 1' },
    { value: 'Room 2', label: 'Laboratory Room 2' },
    { value: 'Room 3', label: 'Classroom' },
];

export default function STRequest() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [dateError, setDateError] = useState('');

    const handleDateChange = (event) => {
        const date = event.target.value;
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            setDateError('The date must be today or a future date.');
        } else {
            setDateError('');
        }
        setSelectedDate(date);
    };

    const handleNext = () => {
        if (!dateError) {
            navigate('/teacherdashboard/select'); // Route to the desired page
        }
    };

    return (
        < >
            <div style={{display: 'flex', height: '100vh', width: '100vw'}}>
                <Appbar page="schedule"/>
                <Sidebar page={"schedule"}/>
                <div style={{
                    padding: '20px',
                    flexGrow: 1,
                    marginTop: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <Box sx={{ flexGrow: 1, p: 3, display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                        <MyPaper>
                            <Box
                                sx={{
                                    width: 700,
                                    border: '1px solid #ccc',
                                    padding: 2,
                                    borderRadius: 2,
                                    textAlign: 'center'
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Request Schedule Form
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField
                                        label="Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        error={!!dateError}
                                        helperText={dateError}

                                    />
                                    <TextField
                                        label="Time"
                                        placeholder="e.g., 10:00 AM - 11:00 AM"
                                        fullWidth
                                    />
                                </Box>

                                <TextField
                                    label="Teacher's Name"
                                    value="FetchNameofCurrentLoggedInST" // Replace with actual data
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    select
                                    label="Subject"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    {subjects.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Year and Section"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    {sections.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Room"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    {rooms.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Button variant="contained" fullWidth onClick={handleNext} disabled={!!dateError}>
                                    Next
                                </Button>
                            </Box>
                        </MyPaper>
                    </Box>
                </div>
            </div>
        </>
    );
}