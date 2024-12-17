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
    { field: 'teacher', headerName: 'Teacher' },
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'yearSection', headerName: 'Year & Section' },
    { field: 'subject', headerName: 'Subject' },
    { field: 'room', headerName: 'Room' },
    { field: 'classStatus', headerName: 'Class Status' },
    { field: 'dateApproved',headerName: 'Date Approved'},
    { field: 'dateCreated',headerName: 'Date Created'},
    { field: 'approvedBy',headerName: 'Approved By'},
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

export default function Today() {
    const [rows, setRows] = useState(initialRows);
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    //for editing data of request
    const [getTeacher, setTeacher] = useState('');
    const [getRemarks, setRemarks] = useState(null);
    const [getRoom, setRoom] = useState(null);
    const [getDate, setDate] = useState(null);
    const [getStartHour, setStartHour] = useState('');
    const [getStartMinute, setStartMinute] = useState('');
    const [getEndHour, setEndHour] = useState('');
    const [getEndMinute, setEndMinute] = useState('');
    const [getYearSection, setYearSection] = useState('');
    const [getSubject, setSubject] = useState('');
    const [getApproval, setApproval] = useState('');
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [view, setView] = useState('table'); // State to manage the current view

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setTeacher(row.teacher);
        setDate(new Date(row.date));

        if (row.time && row.time.includes(' - ')) {
            const [start, end] = row.time.split(' - ');
            const [getStartHour, getStartMinute] = start.split(':');
            const [getEndHour, getEndMinute] = end.split(':');
            setStartHour(getStartHour);
            setStartMinute(getStartMinute);
            setEndHour(getEndHour);
            setEndMinute(getEndMinute);
        } else {
            setStartHour('');
            setStartMinute('');
            setEndHour('');
            setEndMinute('');
        }

        setYearSection(row.yearSection || '');
        setSubject(row.subject || '');
        setRoom(row.room || '');
        setApproval(row.approval || '');
        setOpenModal(true);
    };

    const handleSave = () => {
        setOpenConfirmModal(true);
    };

    const handleConfirmSave = () => {
        const updatedRows = rows.map((row) =>
            row === selectedRow
                ? {
                    ...row,
                    teacher: getTeacher,
                    date: getDate.toLocaleDateString(),
                    time: `${getStartHour}:${getStartMinute < 10 ? `0${getStartMinute}` : getStartMinute} - ${getEndHour}:${getEndMinute < 10 ? `0${getEndMinute}` : getEndMinute}`,
                    yearSection: getYearSection,
                    subject: getSubject,
                    room: getRoom,
                    approval: getApproval,
                }
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
                                width: 450,
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
                                    Request Details
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
                                <Select
                                    labelID="Teacher"
                                    value={getTeacher}
                                    onChange={(e) => setTeacher(e.target.value)}
                                    fullWidth
                                    displayEmpty
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select a Teacher
                                    </MenuItem>
                                    <MenuItem value="Mr. Smith">Mr. Smith</MenuItem>
                                    <MenuItem value="Ms. Johnson">Ms. Johnson</MenuItem>
                                    <MenuItem value="Dr. Brown">Dr. Brown</MenuItem>
                                    <MenuItem value="Prof. Davis">Prof. Davis</MenuItem>
                                    <MenuItem value="Mrs. Taylor">Mrs. Taylor</MenuItem>
                                </Select>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Date"
                                        value={getDate}
                                        onChange={(newValue) => setDate(newValue)}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                backgroundColor: '#FFFFFF',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Select
                                        labelId="start-hour-label"
                                        id="start-hour-select"
                                        value={getStartHour}
                                        onChange={(e) => setStartHour(e.target.value)}
                                        displayEmpty
                                        sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                    >
                                        <MenuItem value="" disabled>00</MenuItem>
                                        {[...Array(12).keys()].map((hour) => (
                                            <MenuItem key={hour + 1} value={hour + 1}>{hour + 1}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography>:</Typography>
                                    <Select
                                        labelId="start-minute-label"
                                        id="start-minute-select"
                                        value={getStartMinute}
                                        onChange={(e) => setStartMinute(e.target.value)}
                                        displayEmpty
                                        sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                    >
                                        <MenuItem value="" disabled>00 PM</MenuItem>
                                        {["00 AM", "15 AM", "30 AM", "45 AM", "00 PM", "15 PM", "30 PM", "45 PM"].map((minute) => (
                                            <MenuItem key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography>-</Typography>
                                    <Select
                                        labelId="end-hour-label"
                                        id="end-hour-select"
                                        value={getEndHour}
                                        onChange={(e) => setEndHour(e.target.value)}
                                        displayEmpty
                                        sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                    >
                                        <MenuItem value="" disabled>00</MenuItem>
                                        {[...Array(12).keys()].map((hour) => (
                                            <MenuItem key={hour + 1} value={hour + 1}>{hour + 1}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography>:</Typography>
                                    <Select
                                        labelId="end-minute-label"
                                        id="end-minute-select"
                                        value={getEndMinute}
                                        onChange={(e) => setEndMinute(e.target.value)}
                                        displayEmpty
                                        sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                    >
                                        <MenuItem value="" disabled>00 PM</MenuItem>
                                        {["00 AM", "15 AM", "30 AM", "45 AM","00 PM","15 PM", "30 PM", "45 PM"].map((minute) => (
                                            <MenuItem key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Select
                                    labelId="year-section-label"
                                    id="year-section-select"
                                    value={getYearSection}
                                    onChange={(e) => setYearSection(e.target.value)}
                                    fullWidth
                                    displayEmpty
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select Year and Section
                                    </MenuItem>
                                    <MenuItem value="Year 1 - Section A">Year 1 - Section A</MenuItem>
                                    <MenuItem value="Year 1 - Section B">Year 1 - Section B</MenuItem>
                                    <MenuItem value="Year 2 - Section A">Year 2 - Section A</MenuItem>
                                    <MenuItem value="Year 2 - Section B">Year 2 - Section B</MenuItem>
                                </Select>

                                <Select
                                    labelId="subject-label"
                                    id="subject-select"
                                    value={getSubject}
                                    aria-placeholder={"Subject"}
                                    onChange={(e) => setSubject(e.target.value)}
                                    fullWidth
                                    displayEmpty
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select Subject
                                    </MenuItem>
                                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                                    <MenuItem value="Science">Science</MenuItem>
                                    <MenuItem value="History">History</MenuItem>
                                    <MenuItem value="English">English</MenuItem>
                                </Select>
                                <Select
                                    value={getYearSection}
                                    onChange={(e) => setYearSection(e.target.value)}
                                    fullWidth
                                    displayEmpty
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select Room
                                    </MenuItem>
                                    <MenuItem value="Laboratory 1">Laboratory 1</MenuItem>
                                    <MenuItem value="Laboratory 2">Laboratory 2</MenuItem>
                                    <MenuItem value="Classroom">Classroom</MenuItem>
                                </Select>

                                <TextField
                                    label="Remarks"
                                    value={getRemarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    fullWidth
                                    InputProps={{
                                        style: {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                />
                                <Select
                                    labelId="approval-label"
                                    id="approval-select"
                                    value={getApproval}
                                    onChange={(e) => setApproval(e.target.value)}
                                    fullWidth
                                    displayEmpty
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Approval status
                                    </MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                    <MenuItem value="Rejected">Denied</MenuItem>
                                    <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                                </Select>
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
                                    Submit
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
                            <Typography variant="h6">Are you sure you want to Submit?</Typography>
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