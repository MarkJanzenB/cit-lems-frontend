import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import { Modal, Box, TextField, Typography, Button, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomTable from "../../../Table and Pagination/Table.jsx";
import CustomTablePagination from "../../../Table and Pagination/Pagination.jsx";
import MyPaper from "../../../MyPaper.jsx";

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

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'teacher', headerName: 'Teacher' },
    { field: 'material', headerName: 'Material' },
    {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => (
            <Select
                value={params.row.status}
                onChange={(e) => handleStatusChange(e, params.row.id)}
                fullWidth
            >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
        )
    },
];

const handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    setRows((prevRows) =>
        prevRows.map((row) =>
            row.id === id ? { ...row, status: newStatus } : row
        )
    );
};

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

export default function Request() {
    const [rows, setRows] = useState(initialRows);
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editedTeacher, setEditedTeacher] = useState('');
    const [editedMaterial, setEditedMaterial] = useState('');
    const [editedDate, setEditedDate] = useState(null);
    const [editedTime, setEditedTime] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [view, setView] = useState('table'); // State to manage the current view

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setEditedTeacher(row.teacher);
        setEditedMaterial(row.material);
        setEditedDate(new Date(row.date));
        setEditedTime(moment(row.time, 'h:mm A').toDate());
        setOpenModal(true);
    };

    const handleSave = () => {
        setOpenConfirmModal(true);
    };

    const handleConfirmSave = () => {
        const updatedRows = rows.map((row) =>
            row === selectedRow
                ? { ...row, teacher: editedTeacher, material: editedMaterial, date: editedDate.toLocaleDateString(), time: moment(editedTime).format('h:mm A') }
                : row
        );
        setRows(updatedRows);
        setOpenModal(false);
        setOpenConfirmModal(false);
        setOpenSuccessModal(true);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
    };

    const filteredRows = rows
        .filter((row) => new Date(row.date) > new Date())
        .filter(
            (row) =>
                row.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
                row.material.toLowerCase().includes(searchText.toLowerCase()) ||
                row.date.toLowerCase().includes(searchText.toLowerCase()) ||
                row.time.toLowerCase().includes(searchText.toLowerCase())
        );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const calendarEvents = filteredRows.map((row) => ({
        title: `${row.teacher} (${row.material})`,
        start: moment(`${row.date} ${row.time}`, 'M/D/YYYY h:mm A').toDate(),
        end: moment(`${row.date} ${row.time}`, 'M/D/YYYY h:mm A').add(1, 'hour').toDate(),
        resource: row,
    }));

    const toggleView = () => {
        setView((prevView) => (prevView === 'table' ? 'calendar' : 'table'));
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar page="schedule" />
                <Sidebar page={"schedule"} />
                <div style={{ padding: '20px', flexGrow: 1 }}>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        marginTop: '100px'
                    }}>

                        <TextField
                            label="Search..."
                            variant="outlined"
                            value={searchText}
                            onChange={handleSearch}
                            sx={{flex: 1}}
                        />
                        <Button onClick={toggleView} sx={{marginLeft: '20px'}}>
                            {view === 'table' ? 'Switch to Calendar View' : 'Switch to Table View'}
                        </Button>
                    </Box>

                    {view === 'table' ? (
                        <MyPaper>
                            <CustomTable
                                columns={columns}
                                data={displayedRows}
                                onRowClick={handleEditClick}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <CustomTablePagination
                                    count={filteredRows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                />
                            </Box>
                        </MyPaper>
                    ) : (
                        <Calendar
                            localizer={localizer}
                            events={calendarEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{
                                height: '70vh',
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
                                        padding: '15px',
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
                                    InputProps={{
                                        readOnly: true,
                                        style: {
                                            backgroundColor: '#f0f0f0',
                                            color: '#a0a0a0',
                                        },
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                />
                                <TextField
                                    label="Material"
                                    value={editedMaterial}
                                    onChange={(e) => setEditedMaterial(e.target.value)}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                        style: {
                                            backgroundColor: '#f0f0f0',
                                            color: '#a0a0a0',
                                        },
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                />
                            </Box>

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
                            <Typography variant="h6">Are you sure you want to save?</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                <Button onClick={() => setOpenConfirmModal(false)}>No</Button>
                                <Button onClick={handleConfirmSave} variant="contained" color="primary">
                                    Yes
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
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
                            <Typography variant="h6" sx={{ color: 'green' }}>
                                Save Successfully!
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