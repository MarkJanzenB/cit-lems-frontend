import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, Modal, Box, TextField, Typography, Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const initialRows = [
    { instructor: 'Mr. Smith', time: '9:00 AM - 10:00 AM', section: 'A' },
    { instructor: 'Ms. Johnson', time: '10:00 AM - 11:00 AM', section: 'B' },
    { instructor: 'Dr. Brown', time: '11:00 AM - 12:00 PM', section: 'C' },
    { instructor: 'Prof. Davis', time: '1:00 PM - 2:00 PM', section: 'D' },
    { instructor: 'Mrs. Taylor', time: '2:00 PM - 3:00 PM', section: 'E' },
    { instructor: 'Mr. Lee', time: '3:00 PM - 4:00 PM', section: 'F' },
    { instructor: 'Dr. Harris', time: '4:00 PM - 5:00 PM', section: 'G' },
    { instructor: 'Ms. Wilson', time: '5:00 PM - 6:00 PM', section: 'H' },
    { instructor: 'Prof. Clark', time: '6:00 PM - 7:00 PM', section: 'I' },
    { instructor: 'Mr. Martinez', time: '7:00 PM - 8:00 PM', section: 'J' },
    { instructor: 'Dr. Robinson', time: '8:00 AM - 9:00 AM', section: 'K' },
    { instructor: 'Ms. Lewis', time: '9:00 AM - 10:00 AM', section: 'L' },
    { instructor: 'Prof. Walker', time: '10:00 AM - 11:00 AM', section: 'M' },
    { instructor: 'Mr. Young', time: '11:00 AM - 12:00 PM', section: 'N' },
    { instructor: 'Dr. Allen', time: '1:00 PM - 2:00 PM', section: 'O' },
    { instructor: 'Ms. King', time: '2:00 PM - 3:00 PM', section: 'P' },
    { instructor: 'Prof. Scott', time: '3:00 PM - 4:00 PM', section: 'Q' },
    { instructor: 'Mr. Green', time: '4:00 PM - 5:00 PM', section: 'R' },
    { instructor: 'Dr. Adams', time: '5:00 PM - 6:00 PM', section: 'S' },
    { instructor: 'Ms. White', time: '6:00 PM - 7:00 PM', section: 'T' },
];
export {initialRows};

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

export default function Today() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(initialRows);
    const [searchQuery, setSearchQuery] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    const currentDate = new Date().toLocaleDateString('en-PH');

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedRows = rows
        .filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowClick = (row) => {
        setSelectedRow({ ...row });
        setOpenModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRow((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setConfirmModal(true);
    };

    const handleConfirmSave = (confirm) => {
        if (confirm) {
            const updatedRows = rows.map((row) =>
                row.time === selectedRow.time 
                    ? { ...row, instructor: selectedRow.instructor, section: selectedRow.section }
                    : row
            );
            setRows(updatedRows);
            setSuccessModal(true);
        }
        setConfirmModal(false);
        setOpenModal(false);
    };
    
    

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <Sidebar page={"schedule"} />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <TextField
                        label="Search...."
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '10px', width: '80vw' }}
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
                                    <TableRow
                                        key={index}
                                        onClick={() => handleRowClick(row)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{row.instructor}</TableCell>
                                        <TableCell align="center">{row.time}</TableCell>
                                        <TableCell align="center">{row.section}</TableCell>
                                        <TableCell align="center">{currentDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <Box
                            sx={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)', width: 400,
                                bgcolor: '#FFFFFF', p: 4, borderRadius: '15px',
                                display: 'flex', flexDirection: 'column', gap: 2
                            }}
                        >
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                Edit Schedule
                            </Typography>
                            <TextField
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                label="Date"
                                variant="outlined"
                                fullWidth
                                value={currentDate}
                                disabled
                            />
                            <TextField
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                label="Time"
                                variant="outlined"
                                fullWidth
                                value={selectedRow ? selectedRow.time : ''}
                                disabled
                            />
                            <TextField
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                label="Instructor Name"
                                variant="outlined"
                                fullWidth
                                name="instructor"
                                value={selectedRow ? selectedRow.instructor : ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                label="Section"
                                variant="outlined"
                                fullWidth
                                name="section"
                                value={selectedRow ? selectedRow.section : ''}
                                onChange={handleInputChange}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <Button
                                    onClick={handleSave}
                                    sx={{ backgroundColor: 'maroon', color: '#FFFFFF' }}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    onClick={() => setOpenModal(false)}
                                    sx={{ backgroundColor: '#FFFFFF', color: 'maroon', border: '1px solid maroon' }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Box>
                    </Modal>

                    <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
                        <Box
                            sx={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)', width: 400,
                                bgcolor: '#FFFFFF', p: 4, borderRadius: '15px',
                                display: 'flex', flexDirection: 'column', gap: 2
                            }}
                        >
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                Are you sure you want to save these changes?
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <Button
                                    onClick={() => handleConfirmSave(true)}
                                    sx={{ backgroundColor: 'maroon', color: '#FFFFFF' }}
                                >
                                    Yes
                                </Button>
                                <Button
                                    onClick={() => handleConfirmSave(false)}
                                    sx={{ backgroundColor: '#FFFFFF', color: 'maroon', border: '1px solid maroon' }}
                                >
                                    No
                                </Button>
                            </div>
                        </Box>
                    </Modal>

                    <Modal open={successModal} onClose={() => setSuccessModal(false)}>
                        <Box
                            sx={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)', width: 400,
                                bgcolor: '#FFFFFF', p: 4, borderRadius: '15px',
                                display: 'flex', flexDirection: 'column', gap: 2
                            }}
                        >
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                Success!
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#016565', textAlign: 'center' }}>
                                The changes have been saved successfully.
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <Button
                                    onClick={() => setSuccessModal(false)}
                                    sx={{ backgroundColor: 'maroon', color: '#FFFFFF' }}
                                >
                                    Close
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </ThemeProvider>
    );
}
