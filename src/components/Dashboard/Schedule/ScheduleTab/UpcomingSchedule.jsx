import React, { useState } from 'react';
import ScheduleSidebar from '../../../Sidebar/ScheduleSidebar';
import Appbar from '../../../Appbar/Appbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

// Dummy data
const rows = [
    { instructor: 'Mr. Topacio', time: '9:00 AM - 10:00 AM', section: 'G1' },
    { instructor: 'Ms. Bandola', time: '10:00 AM - 11:00 AM', section: 'G1' },
    { instructor: 'Dr. Mark', time: '11:00 AM - 12:00 PM', section: 'G5' },
    { instructor: 'Prof. Dona', time: '1:00 PM - 2:00 PM', section: 'G5' },
    { instructor: 'Mrs. Topacio', time: '2:00 PM - 3:00 PM', section: 'G2' },
    { instructor: 'Mr. Bandola', time: '9:00 AM - 10:00 AM', section: 'G4' },
    { instructor: 'Ms. Crazy', time: '10:00 AM - 11:00 AM', section: 'G4' },
    { instructor: 'Mr. Topacio', time: '9:00 AM - 10:00 AM', section: 'G1' },
    { instructor: 'Ms. Bandola', time: '10:00 AM - 11:00 AM', section: 'G1' },
    { instructor: 'Dr. Mark', time: '11:00 AM - 12:00 PM', section: 'G5' },
    { instructor: 'Prof. Dona', time: '1:00 PM - 2:00 PM', section: 'G5' },
    { instructor: 'Mrs. Topacio', time: '2:00 PM - 3:00 PM', section: 'G2' },
    { instructor: 'Mr. Topacio', time: '9:00 AM - 10:00 AM', section: 'G1' },
    { instructor: 'Ms. Bandola', time: '10:00 AM - 11:00 AM', section: 'G1' },
    { instructor: 'Dr. Mark', time: '11:00 AM - 12:00 PM', section: 'G5' },
    { instructor: 'Prof. Dona', time: '1:00 PM - 2:00 PM', section: 'G5' },
    { instructor: 'Mrs. Topacio', time: '2:00 PM - 3:00 PM', section: 'G2' },
    { instructor: 'Mr. Bandola', time: '9:00 AM - 10:00 AM', section: 'G4' },
    { instructor: 'Ms. Crazy', time: '10:00 AM - 11:00 AM', section: 'G4' },
    { instructor: 'Mr. Topacio', time: '9:00 AM - 10:00 AM', section: 'G1' },
    { instructor: 'Ms. Bandola', time: '10:00 AM - 11:00 AM', section: 'G1' },
    { instructor: 'Dr. Mark', time: '11:00 AM - 12:00 PM', section: 'G5' },
    { instructor: 'Prof. Dona', time: '1:00 PM - 2:00 PM', section: 'G5' },
    { instructor: 'Mrs. Topacio', time: '2:00 PM - 3:00 PM', section: 'G2' },
    { instructor: 'Mr. Bandola', time: '9:00 AM - 10:00 AM', section: 'G4' },
    { instructor: 'Ms. Crazy', time: '10:00 AM - 11:00 AM', section: 'G4' },
    { instructor: 'Mr. Bandola', time: '9:00 AM - 10:00 AM', section: 'G4' },
    { instructor: 'Ms. Crazy', time: '10:00 AM - 11:00 AM', section: 'G4' },
   
 
];

export default function UpcomingSchedule() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Calculate the rows to display on the current page
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ display: 'flex', height: 'auto', width: '100vw' }}>
            <Appbar />
            <ScheduleSidebar />
            <div style={{ padding: '20px', flexGrow: 1, marginTop:'50px' }}>
                <TableContainer component={Paper} style={{ height:'auto',width:'90%',  overflow: 'auto', marginTop: '50px' }}>
                    <Table sx={{  }} aria-label="instructor schedule table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Instructor Name</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Section</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedRows.map((row, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.instructor}
                                    </TableCell>
                                    <TableCell align="center">{row.time}</TableCell>
                                    <TableCell align="center">{row.section}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}
