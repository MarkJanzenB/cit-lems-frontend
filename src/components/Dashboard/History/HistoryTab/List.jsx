import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const teacherNames = ['Mr. Topacio', 'Ms. Smith', 'Dr. Johnson', 'Prof. Brown', 'Mrs. Davis'];

const getRandomName = () => teacherNames[Math.floor(Math.random() * teacherNames.length)];

const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: getRandomName(),
    description: `Description for item ${index + 1}`
}));

const itemsBorrowed = [
    { name: 'Testtube', quantity: 2, serialNumbers: ['SN001', 'SN002'] },
    { name: 'DM13 APFSDS', quantity: 1, serialNumbers: ['WAT003'] },
];

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

export default function List() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [serialNumberModalOpen, setSerialNumberModalOpen] = useState(false);
    const [selectedSerialNumbers, setSelectedSerialNumbers] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [breakageDescription, setBreakageDescription] = useState('');

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

    const handleConfirmReport = () => {
        setConfirmModalOpen(false);
        setSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalOpen(false);
        setOpenModal(false);
    };

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleOpenSerialNumberModal = (serialNumbers) => {
        setSelectedSerialNumbers(serialNumbers);
        setSerialNumberModalOpen(true);
    };

    const handleCloseSerialNumberModal = () => {
        setSerialNumberModalOpen(false);
    };

    const handleItemSelection = (item) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(item)
                ? prevSelectedItems.filter((i) => i !== item)
                : [...prevSelectedItems, item]
        );
    };

    const handleBreakageDescriptionChange = (event) => {
        setBreakageDescription(event.target.value);
    };

    const filteredData = dummyData.filter(row => row.name.toLowerCase().includes(filterText.toLowerCase()));

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <Sidebar page={"borrowhistory"} />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <TextField
                        label="Filter by name"
                        variant="outlined"
                        value={filterText}
                        onChange={handleFilterChange}
                        style={{ marginBottom: '20px' }}
                    />
                    <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Borrow History</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id} onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{`Schedule of ${row.name}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            component="div"
                            count={filteredData.length}
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
                            Report a Breakage
                        </Typography>
                        <Typography variant="body1">Teacher's name: Mr. Topacio</Typography>
                        <Typography variant="body1">Schedule: Nov 21, 2024 | 10:00 AM - 12:00 PM</Typography>
                        <Typography variant="body1">Items borrowed list:</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Quantity Borrowed</TableCell>
                                        <TableCell>Select</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {itemsBorrowed.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Button onClick={() => handleOpenSerialNumberModal(item.serialNumbers)}>
                                                    {item.name}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={selectedItems.includes(item.name)}
                                                            onChange={() => handleItemSelection(item.name)}
                                                        />
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={handleCloseModal}>Close</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }} onClick={handleOpenConfirmModal}>Report</Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal open={serialNumberModalOpen} onClose={handleCloseSerialNumberModal}>
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
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#016565' }}>Serial Numbers</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Serial Number</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedSerialNumbers.map((serialNumber, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{serialNumber}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" onClick={handleCloseSerialNumberModal} sx={{ mt: 2, color: 'white', backgroundColor: 'maroon' }}>Close</Button>
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
                            boxShadow: 24,
                            bgcolor: '#F2EE9D',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: '15px',
                            textAlign: 'center'
                        }}>
                        <Typography sx={{ fontWeight: 'bold', color: '#016565' }} variant="h6">
                            Are you sure you want to report this breakage?
                        </Typography>
                        <TextField
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                            label="Description of Breakage"
                            variant="outlined"
                            fullWidth
                            value={breakageDescription}
                            onChange={handleBreakageDescriptionChange}
                        />
                        <Box display="flex" justifyContent="space-around" mt={2}>
                            <Button variant="contained" sx={{ backgroundColor: 'maroon' }} onClick={handleConfirmReport}>Yes</Button>
                            <Button variant="outlined" sx={{ backgroundColor: 'maroon', color: 'white' }} onClick={handleCloseConfirmModal}>No</Button>
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
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#016565' }}>Breakage Successfully Reported</Typography>
                        <Button variant="contained" onClick={handleCloseSuccessModal} sx={{ mt: 2, color: 'white', backgroundColor: 'maroon' }}>OK</Button>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}