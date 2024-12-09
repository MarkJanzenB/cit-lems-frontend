import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Modal, Box, TextField, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const localizer = momentLocalizer(moment);

export default function UpcomingSchedule() {
    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editedInstructor, setEditedInstructor] = useState('');
    const [editedSection, setEditedSection] = useState('');
    const [editedDate, setEditedDate] = useState(null);
    const [editedStartTime, setEditedStartTime] = useState(null);
    const [editedEndTime, setEditedEndTime] = useState(null);
    const [viewMode, setViewMode] = useState('table');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        setPage(0);
    };

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setEditedInstructor(row.instructor);
        setEditedSection(row.section);
        setEditedDate(new Date(row.date));
        setEditedStartTime(moment(row.startTime, 'h:mm A').toDate());
        setEditedEndTime(moment(row.endTime, 'h:mm A').toDate());
        setOpenModal(true);
    };

    const handleSaveClick = () => {
        setOpenConfirmModal(true); // Open confirmation modal
    };
    const handleConfirmSave = () => {
        const updatedRows = rows.map((row) =>
            row === selectedRow
                ? {
                      ...row,
                      instructor: editedInstructor,
                      section: editedSection,
                      date: editedDate.toLocaleDateString(),
                      startTime: moment(editedStartTime).format('h:mm A'),
                      endTime: moment(editedEndTime).format('h:mm A'),
                  }
                : row
        );
        setRows(updatedRows);
        setOpenModal(false); // Close edit modal
        setOpenConfirmModal(false); // Close confirmation modal
        setOpenSuccessModal(true); // Open success modal
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    const handleViewToggle = () => {
        setViewMode(viewMode === 'table' ? 'calendar' : 'table');
    };

    const filteredRows = rows.filter(
        (row) =>
            row.instructor.toLowerCase().includes(searchText.toLowerCase()) ||
            row.section.toLowerCase().includes(searchText.toLowerCase()) ||
            row.date.toLowerCase().includes(searchText.toLowerCase()) ||
            row.startTime.toLowerCase().includes(searchText.toLowerCase()) ||
            row.endTime.toLowerCase().includes(searchText.toLowerCase())
    );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const calendarEvents = rows.map((row) => ({
        title: `${row.instructor} (${row.section})`,
        start: moment(`${row.date} ${row.startTime}`, 'M/D/YYYY h:mm A').toDate(),
        end: moment(`${row.date} ${row.endTime}`, 'M/D/YYYY h:mm A').toDate(),
        resource: row,
    }));

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <Sidebar page="schedule" />
                <div style={{ padding: '20px', flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '100px' }}>
                        <TextField
                            label="Search..."
                            variant="outlined"
                            value={searchText}
                            onChange={handleSearch}
                            sx={{ flex: 1 }}
                        />
                        <Button onClick={handleViewToggle} sx={{ marginLeft: '30px', backgroundColor: '#016565', color: '#FFFFFF' }}>
                            {viewMode === 'table' ? 'Calendar View' : 'Table View'}
                        </Button>
                    </Box>
                    {viewMode === 'table' ? (
                        <TableContainer component={Paper}>
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
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                            />
                        </TableContainer>
                    ) : (
                        <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{
                            height: '75vh',
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black',
                        }}
                        eventPropGetter={(event) => {
                            
                            const isHighlighted =
                                event.title.toLowerCase().includes(searchText.toLowerCase());
                            return {
                                style: {
                                    backgroundColor: isHighlighted ? 'maroon' : '#d3d3d3', 
                                    color: isHighlighted ? 'white' : 'black', 
                                    borderRadius: '5px',
                                    border: isHighlighted ? '1px solid white' : 'none',
                                },
                            };
                        }}
                        onSelectEvent={(event) => handleEditClick(event.resource)}
                    />
                    
                    )}

<Modal open={openModal} onClose={() => setOpenModal(false)}>
    <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#FFFFFF',
            borderRadius: '15px',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}
    >
        {/* Modal Header */}
        <Box
            sx={{
                backgroundColor: '#016565', 
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                }}
            >
                Edit Schedule
            </Typography>
            <Button
                onClick={() => setOpenModal(false)}
                sx={{
                    color: '#FFFFFF',
                    background: 'none',
                    minWidth: 'unset',
                    padding: 0,
                    '&:hover': {
                        background: 'none',
                    },
                }}
            >
                ✕
            </Button>
        </Box>

        {/* Modal Content Area */}
        <Box
            sx={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    value={editedDate}
                    onChange={(newValue) => setEditedDate(newValue)}
                    sx={{
                        '& input': { backgroundColor: '#f9f9f9' },
                    }}
                />
                <TimePicker
                    label="Start Time"
                    value={editedStartTime}
                    onChange={(newValue) => setEditedStartTime(newValue)}
                />
                <TimePicker
                    label="End Time"
                    value={editedEndTime}
                    onChange={(newValue) => setEditedEndTime(newValue)}
                />
            </LocalizationProvider>
            <TextField
                label="Instructor Name"
                value={editedInstructor}
                onChange={(e) => setEditedInstructor(e.target.value)}
                fullWidth
                sx={{ '& input': { backgroundColor: '#f9f9f9' } }}
            />
            <TextField
                label="Section"
                value={editedSection}
                onChange={(e) => setEditedSection(e.target.value)}
                fullWidth
                sx={{ '& input': { backgroundColor: '#f9f9f9' } }}
            />
        </Box>

        {/* Modal Footer */}
        <Box
            sx={{
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Button
                onClick={() => setOpenModal(false)}
                sx={{
                    color: '#016565',
                    borderColor: '#016565',
                    border: '1px solid',
                    padding: '8px 16px',
                    borderRadius: '8px',
                }}
            >
                Cancel
            </Button>
            <Button
                onClick={handleSaveClick}
                sx={{
                    backgroundColor: 'maroon',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: '#a00000',
                    },
                }}
            >
                Save
            </Button>
        </Box>
    </Box>
        </Modal>
        {/* Confirmation Modal */}
        <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                                <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 300,
                                bgcolor: 'white',
                                borderRadius: '15px',
                                boxShadow: 24,
                                padding: '20px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h6">Are you sure you want to save this?</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                <Button onClick={() => setOpenConfirmModal(false)}>No</Button>
                                <Button onClick={handleConfirmSave} variant="contained" color="primary">
                                    Yes
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    {/* Success Modal */}
                    <Modal open={openSuccessModal} onClose={handleCloseSuccessModal}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 300,
                                bgcolor: 'white',
                                borderRadius: '15px',
                                boxShadow: 24,
                                padding: '20px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h6" color="green">
                                Save successfully!
                            </Typography>
                            <Button
                                onClick={() => setOpenSuccessModal(false)}
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: '20px' }}
                            >
                                OK
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </ThemeProvider>
    );
}
