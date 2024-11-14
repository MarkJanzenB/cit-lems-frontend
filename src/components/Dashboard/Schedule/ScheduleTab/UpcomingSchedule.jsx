import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Modal, Box, TextField, Typography, Button, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const generateRandomFutureDate = () => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 365) + 1;
    today.setDate(today.getDate() + randomDays);
    return today.toLocaleDateString();
};

const initialRows = [
    { instructor: 'Mr. Smith', startTime: '9:00 AM', endTime: '10:00 AM', section: 'G5', date: generateRandomFutureDate() },
    { instructor: 'Ms. Johnson', startTime: '10:00 AM', endTime: '11:00 AM', section: 'G2', date: generateRandomFutureDate() },
    { instructor: 'Dr. Brown', startTime: '11:00 AM', endTime: '12:00 PM', section: 'G1', date: generateRandomFutureDate() },
    { instructor: 'Prof. Davis', startTime: '1:00 PM', endTime: '2:00 PM', section: 'G3', date: generateRandomFutureDate() },
    { instructor: 'Mrs. Taylor', startTime: '2:00 PM', endTime: '3:00 PM', section: 'G4', date: generateRandomFutureDate() },
];

const theme = createTheme({
    palette: {
        primary: { main: '#016565' },
        secondary: { main: '#000000' },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#016565',
                    color: '#FFFFFF',
                },
                body: {
                    fontSize: 14,
                },
            },
        },
    },
});

export default function UpcomingSchedule() {
    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);  
    const [selectedRow, setSelectedRow] = useState(null);
    const [editedInstructor, setEditedInstructor] = useState('');
    const [editedStartTime, setEditedStartTime] = useState(null);  
    const [editedEndTime, setEditedEndTime] = useState(null);  
    const [editedSection, setEditedSection] = useState('');
    const [editedDate, setEditedDate] = useState(null); 
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        setPage(0);
    };

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setEditedInstructor(row.instructor);
        setEditedSection(row.section);
        setEditedDate(new Date(row.date));  

        const startTimeParts = row.startTime.split(' ');
        const endTimeParts = row.endTime.split(' ');

        const startTimeDate = new Date();
        const endTimeDate = new Date();

        const startHours = parseInt(startTimeParts[0].split(':')[0]);
        const startMinutes = parseInt(startTimeParts[0].split(':')[1]);
        const endHours = parseInt(endTimeParts[0].split(':')[0]);
        const endMinutes = parseInt(endTimeParts[0].split(':')[1]);

        if (startTimeParts[1] === 'PM' && startHours < 12) startTimeDate.setHours(startHours + 12, startMinutes);
        else startTimeDate.setHours(startHours, startMinutes);

        if (endTimeParts[1] === 'PM' && endHours < 12) endTimeDate.setHours(endHours + 12, endMinutes);
        else endTimeDate.setHours(endHours, endMinutes);

        setEditedStartTime(startTimeDate);
        setEditedEndTime(endTimeDate);
        setOpenModal(true);
    };

    const handleSave = () => {
        setOpenConfirmModal(true); 
    };

    const confirmAndSave = () => {
        const updatedRows = rows.map((row) =>
            row === selectedRow
                ? { ...row, instructor: editedInstructor, startTime: editedStartTime.toLocaleTimeString(), endTime: editedEndTime.toLocaleTimeString(), section: editedSection, date: editedDate.toLocaleDateString() }
                : row
        );

        setRows(updatedRows);
        setOpenSnackbar(true);
        setOpenConfirmModal(false);  
        setOpenModal(false); 
    };

    const cancelSave = () => {
        setOpenConfirmModal(false); 
    };

    const cancelEdit = () => {
        setOpenModal(false); 
    };

    const filteredRows = rows.filter(row => 
        row.instructor.toLowerCase().includes(searchText.toLowerCase()) ||
        row.startTime.toLowerCase().includes(searchText.toLowerCase()) ||
        row.endTime.toLowerCase().includes(searchText.toLowerCase()) ||
        row.section.toLowerCase().includes(searchText.toLowerCase()) ||
        row.date.toLowerCase().includes(searchText.toLowerCase())
    );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <Sidebar page={"schedule"} />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <TextField 
                        label="Search...." 
                        variant="outlined" 
                        value={searchText} 
                        onChange={handleSearch} 
                        fullWidth 
                        sx={{ marginBottom: '10px', width: '80vw' }}
                    />
                    <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Instructor Name</TableCell>
                                    <TableCell align="center">Time</TableCell>
                                    <TableCell align="center">Section</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.map((row, index) => (
                                    <TableRow key={index} onClick={() => handleEditClick(row)} style={{ cursor: 'pointer' }}>
                                        <TableCell>{row.instructor}</TableCell>
                                        <TableCell align="center">{`${row.startTime} - ${row.endTime}`}</TableCell>
                                        <TableCell align="center">{row.section}</TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                    <Modal open={openModal} onClose={cancelEdit}>
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)', width: 400,
                            bgcolor: '#FFFFFF', p: 4, borderRadius: '15px',
                            display: 'flex', flexDirection: 'column', gap: 2
                        }}>
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                Edit Schedule
                            </Typography>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={editedDate}
                                    onChange={(newValue) => setEditedDate(newValue)}
                                    minDate={new Date()}  
                                    sx={{ '& input': { backgroundColor: 'white' } }}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Instructor Name"
                                value={editedInstructor}
                                onChange={(e) => setEditedInstructor(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Section"
                                value={editedSection}
                                onChange={(e) => setEditedSection(e.target.value)}
                                fullWidth
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Start Time"
                                    value={editedStartTime}
                                    onChange={(newValue) => setEditedStartTime(newValue)}
                                    sx={{ '& input': { backgroundColor: 'white' } }}
                                />
                                <TimePicker
                                    label="End Time"
                                    value={editedEndTime}
                                    onChange={(newValue) => setEditedEndTime(newValue)}
                                    sx={{ '& input': { backgroundColor: 'white' } }}
                                />
                            </LocalizationProvider>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                <Button onClick={cancelEdit} variant="outlined" sx={{ width: '45%', color:'maroon' }}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} variant="contained" sx={{ width: '45%', backgroundColor:'maroon' }}>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    <Modal open={openConfirmModal} onClose={cancelSave}>
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)', width: 400,
                            bgcolor: '#FFFFFF', p: 4, borderRadius: '15px',
                            display: 'flex', flexDirection: 'column', gap: 2
                        }}>
                            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color:'darkgreen' }}>
                                Are you sure you want to save the changes?
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                <Button onClick={cancelSave} variant="outlined" sx={{ width: '45%', color:'maroon' }}>
                                    No
                                </Button>
                                <Button onClick={confirmAndSave} variant="contained" sx={{ width: '45%',backgroundColor:'maroon' }}>
                                    Yes
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Modal open={openSnackbar} onClose={() => setOpenSnackbar(false)}>
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)', width: 400,
                            bgcolor: '#FFFFFF', p: 4, borderRadius: '15px',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Schedule Updated!
                            </Typography>
                            <Button 
                                variant="contained" 
                                sx={{ bgcolor: '#800000', color: 'white' }} 
                                onClick={() => setOpenSnackbar(false)}
                            >
                                Close
                            </Button>
                        </Box>
                    </Modal>

                </div>
                </div>
        </ThemeProvider>
    );
}
