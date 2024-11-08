import React, { useState } from 'react';
import ScheduleSidebar from '../../../Sidebar/ScheduleSidebar';
import Appbar from '../../../Appbar/Appbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Mr. Topacio ${index + 1}`,
    description: `Description for item ${index + 1}`
}));

const theme = createTheme({
    palette: {
        primary: { main: '#016565' },
        secondary: { main: '#000000' }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#016565'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000'
                    },
                    color: '#FFFFFF'
                }
            }
        }
    }
});

export default function Request() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenConfirmModal = () => {
        setConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleConfirmSchedule = () => {
        setConfirmModalOpen(false);
        setSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalOpen(false);
        setOpenModal(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <ScheduleSidebar />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Count</TableCell>
                                    <TableCell>Request Form</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dummyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id} onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{`Request from ${row.name}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            component="div"
                            count={dummyData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>

                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: '#F2EE9D',
                            boxShadow: 24,
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius:'25px'
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign:'center' }}>
                            SET SCHEDULE
                        </Typography>
                        <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Date" variant="outlined" fullWidth />
                        <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Time" variant="outlined" fullWidth />
                        <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Teacher" variant="outlined" fullWidth />
                        <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Material to be Borrowed" variant="outlined" fullWidth />
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={handleCloseModal}>Close</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }} onClick={handleOpenConfirmModal}>Set</Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal open={confirmModalOpen} onClose={handleCloseConfirmModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            bgcolor: '#F2EE9D',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: '15px',
                            textAlign: 'center'
                        }}
                    >
                        <Typography sx={{fontWeight:'bold', color: '#016565',}}variant="h6">Are you sure you want to set this schedule?</Typography>
                        <Box display="flex" justifyContent="space-around" mt={2}>
                            <Button variant="contained" sx={{backgroundColor:'maroon'}} onClick={handleConfirmSchedule}>Yes</Button>
                            <Button variant="outlined" sx={{backgroundColor:'maroon', color:'white'}} onClick={handleCloseConfirmModal}>No</Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal open={successModalOpen} onClose={handleCloseSuccessModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: '#F2EE9D',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '15px',
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h6" sx={{fontWeight:'bold',color:'#016565'}}>Schedule Successfully Added</Typography>
                        <Button variant="contained"  onClick={handleCloseSuccessModal} sx={{ mt: 2, color:'white', backgroundColor:'maroon' }}>OK</Button>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}
