import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, Modal, Box, TextField, Typography, Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const rows = [
    { instructor: 'Mr. Smith', time: '9:00 AM - 10:00 AM', section: 'G5' },
    { instructor: 'Ms. Johnson', time: '10:00 AM - 11:00 AM', section: 'G2' },
    { instructor: 'Dr. Brown', time: '11:00 AM - 12:00 PM', section: 'G1' },
    { instructor: 'Prof. Davis', time: '1:00 PM - 2:00 PM', section: 'G3' },
    { instructor: 'Mrs. Taylor', time: '2:00 PM - 3:00 PM', section: 'G4' },
    { instructor: 'Mr. Smith', time: '9:00 AM - 10:00 AM', section: 'G5' },
    { instructor: 'Ms. Johnson', time: '10:00 AM - 11:00 AM', section: 'G2' },
    { instructor: 'Dr. Brown', time: '11:00 AM - 12:00 PM', section: 'G1' },
    { instructor: 'Prof. Davis', time: '1:00 PM - 2:00 PM', section: 'G3' },
    { instructor: 'Mrs. Taylor', time: '2:00 PM - 3:00 PM', section: 'G4' },
    { instructor: 'Mr. Smith', time: '9:00 AM - 10:00 AM', section: 'G5' },
    { instructor: 'Ms. Johnson', time: '10:00 AM - 11:00 AM', section: 'G2' },
    { instructor: 'Dr. Brown', time: '11:00 AM - 12:00 PM', section: 'G1' },
    { instructor: 'Prof. Davis', time: '1:00 PM - 2:00 PM', section: 'G3' },
    { instructor: 'Mrs. Taylor', time: '2:00 PM - 3:00 PM', section: 'G4' },
    { instructor: 'Mr. Smith', time: '9:00 AM - 10:00 AM', section: 'G5' },
    { instructor: 'Ms. Johnson', time: '10:00 AM - 11:00 AM', section: 'G2' },
    { instructor: 'Dr. Brown', time: '11:00 AM - 12:00 PM', section: 'G1' },
    { instructor: 'Prof. Davis', time: '1:00 PM - 2:00 PM', section: 'G3' },
    { instructor: 'Mrs. Taylor', time: '2:00 PM - 3:00 PM', section: 'G4' },
  
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <Sidebar page={"schedule"} />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Instructor Name</TableCell>
                                    <TableCell align="center">Time</TableCell>
                                    <TableCell align="center">Section</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.map((row, index) => (
                                    <TableRow key={index} onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }}>
                                        <TableCell>{row.instructor}</TableCell>
                                        <TableCell align="center">{row.time}</TableCell>
                                        <TableCell align="center">{row.section}</TableCell>
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
                                bgcolor: '#F2EE9D', p: 4, borderRadius: '15px',
                                display: 'flex', flexDirection: 'column', gap: 2
                            }}
                        >
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                Edit Schedule
                            </Typography>
                            <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Date" variant="outlined" fullWidth />
                            <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Time" variant="outlined" fullWidth />
                            <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Instructor" variant="outlined" fullWidth />
                            <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Section" variant="outlined" fullWidth />
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button variant="contained" sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }}>
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
