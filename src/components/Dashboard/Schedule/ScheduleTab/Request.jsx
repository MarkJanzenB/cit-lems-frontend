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
    { id: 1, date: generateRandomFutureDate(), time: '9:00 AM', teacher: 'Mr. Smith', material: 'Microscope' },
    { id: 2, date: generateRandomFutureDate(), time: '10:00 AM', teacher: 'Ms. Johnson', material: 'Beakers' },
    { id: 3, date: generateRandomFutureDate(), time: '11:00 AM', teacher: 'Dr. Brown', material: 'Test Tubes' },
    { id: 4, date: generateRandomFutureDate(), time: '1:00 PM', teacher: 'Prof. Davis', material: 'Bunsen Burner' },
    { id: 5, date: generateRandomFutureDate(), time: '2:00 PM', teacher: 'Mrs. Taylor', material: 'Slides' },
];

const theme = createTheme({
    palette: {
        primary: { main: '#016565' }, // Header sa table screen kay green
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

export default function Request() {
    const [rows, setRows] = useState(initialRows); //store ang list of requests
    const [page, setPage] = useState(0); // display 1st table
    const [rowsPerPage, setRowsPerPage] = useState(10); //table limit kay 10
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false); //display ang modal if i click specific row
    const [selectedRow, setSelectedRow] = useState(null); // display ang edited data sa row
    const [editedTeacher, setEditedTeacher] = useState(''); // store ang edited teacher name sa table
    const [editedMaterial, setEditedMaterial] = useState(''); // store and edited BM sa table
    const [editedDate, setEditedDate] = useState(null); //store ang edited date sa table
    const [editedTime, setEditedTime] = useState(null); // store edited time sa table
    const [viewMode, setViewMode] = useState('table'); // toggle between table nd calendar view

    const handleSearch = (event) => {    // filter ang specific row include teacher,material, date or time
        setSearchText(event.target.value);
        setPage(0);
    };

    const handleEditClick = (row) => {    // if iclick nako ang specific row, ang data sa specific row mo display sa modal
        setSelectedRow(row);
        setEditedTeacher(row.teacher);
        setEditedMaterial(row.material);
        setEditedDate(new Date(row.date));
        setEditedTime(moment(row.time, 'h:mm A').toDate());
        setOpenModal(true);
    };

    const handleSave = () => {     // if i click save mo update sa specific row ang changes or edited data
        const updatedRows = rows.map((row) =>
            row === selectedRow
                ? { ...row, teacher: editedTeacher, material: editedMaterial, date: editedDate.toLocaleDateString(), time: moment(editedTime).format('h:mm A') }
                : row
        );
        setRows(updatedRows);
        setOpenModal(false);
    };

    const handleViewToggle = () => {             
        setViewMode(viewMode === 'table' ? 'calendar' : 'table');
    };

    const filteredRows = rows
        .filter((row) => new Date(row.date) > new Date()) // Only include future dates
        .filter(
            (row) =>
                row.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
                row.material.toLowerCase().includes(searchText.toLowerCase()) ||
                row.date.toLowerCase().includes(searchText.toLowerCase()) ||
                row.time.toLowerCase().includes(searchText.toLowerCase())
        );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const calendarEvents = filteredRows.map((row) => ({
        title: `${row.teacher} (${row.material})`, //
        start: moment(`${row.date} ${row.time}`, 'M/D/YYYY h:mm A').toDate(),
        end: moment(`${row.date} ${row.time}`, 'M/D/YYYY h:mm A').add(1, 'hour').toDate(),
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
                                    <TableRow> {/* display ang header sa table*/}
                                        <TableCell>ID</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Time</TableCell>
                                        <TableCell align="center">Teacher</TableCell>
                                        <TableCell align="center">Material</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedRows.map((row, index) => (
                                        <TableRow key={index} onClick={() => handleEditClick(row)} style={{ cursor: 'pointer' }}>
                                            <TableCell>{row.id}</TableCell>  
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.time}</TableCell>
                                            <TableCell align="center">{row.teacher}</TableCell>
                                            <TableCell align="center">{row.material}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination    /* in one page 10 row ang displayed*/
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
                                const isHighlighted = event.title.toLowerCase().includes(searchText.toLowerCase());
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
                            overflow: 'hidden',
                        }}
                    >
                        {/* Modal Header */}
                        <Box
                          sx={{
                              backgroundColor: '#016565', 
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                          }}
                      >
                          <Typography
                              variant="h6"
                              sx={{
                                  fontWeight: 'bold',
                                  color: '#FFFFFF', 
                                  padding:'15px',
                              }}
                          >
                              Edit Request
                          </Typography>
                          <Button
                              onClick={() => setOpenModal(false)}
                              sx={{
                                  color: '#FFFFFF',
                                  background: 'none',
                                  paddingLeft: '7px',
                                  minWidth: 'unset',
                                  '&:hover': {
                                      background: 'none',
                                  },
                              }}
                          >
                              ✕
                          </Button>
                      </Box>


                        {/* Modal Content */}
                        <Box
                            sx={{
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                         

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={editedDate}
                                    onChange={(newValue) => setEditedDate(newValue)}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#FFFFFF',
                                        },
                                    }}
                                />
                                <TimePicker
                                    label="Time"
                                    value={editedTime}
                                    onChange={(newValue) => setEditedTime(newValue)}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#FFFFFF',
                                        },
                                    }}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Teacher"
                                value={editedTeacher}
                                onChange={(e) => setEditedTeacher(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#FFFFFF',
                                    },
                                }}
                            />
                            <TextField
                                label="Material"
                                value={editedMaterial}
                                onChange={(e) => setEditedMaterial(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#FFFFFF',
                                    },
                                }}
                            />
                        </Box>

                        {/* Modal Footer */}
                        <Box
                            sx={{
                                padding: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #e0e0e0',
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            <Button
                                onClick={() => setOpenModal(false)}
                                variant="outlined"
                                sx={{
                                    color: '#333',
                                    borderColor: '#333',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                variant="contained"
                                sx={{
                                    backgroundColor: 'maroon',
                                    color: '#FFFFFF',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: '#014d4d',
                                    },
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                </div>
            </div>
        </ThemeProvider>
    );
}
