import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar.jsx';
import Appbar from '../../Appbar/Appbar.jsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const teacherNames = ['Mr. Topacio', 'Ms. Smith', 'Dr. Johnson', 'Prof. Brown', 'Mrs. Davis'];

const getRandomName = () => teacherNames[Math.floor(Math.random() * teacherNames.length)];

const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: getRandomName(),
    description: `Description for item ${index + 1}`
}));

const itemsBorrowed = [
    { id: 1, name: 'Item placeholder', quantity: 11, serialNumbers: ['WAT003'], status: 'Borrowed' },
    { id: 2, name: 'Item placeholder', quantity: 1, serialNumbers: ['ASDASDW'], status: 'Returned' },
    { id: 3, name: 'Item placeholder', quantity: 1, serialNumbers: ['ASDWA'], status: 'Returned with damage report' },
    { id: 4, name: 'Item placeholder', quantity: 1, serialNumbers: ['WAASDASD03'], status: 'Borrowed' },
    { id: 5, name: 'Item placeholder', quantity: 1, serialNumbers: ['WAT00ASDAS3'], status: 'Returned' },
    { id: 6, name: 'Item placeholder', quantity: 1, serialNumbers: ['WAASDAS03'], status: 'Returned with damage report' },
    { id: 7, name: 'Item placeholder', quantity: 1, serialNumbers: ['WATGFDAVD3'], status: 'Borrowed' },
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
    const [serialNumberModalOpen, setSerialNumberModalOpen] = useState(false);
    const [selectedSerialNumbers, setSelectedSerialNumbers] = useState([]);
    const [filterText, setFilterText] = useState('');

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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id} onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
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
                            width: '90%',
                            maxHeight: '90%',
                            bgcolor: '#F2EE9D',
                            boxShadow: 24,
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: '25px',
                            overflow: 'auto'
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                            Borrowed Items
                        </Typography>
                        <Typography variant="body1">Teacher's name: Mr. Topacio</Typography>
                        <Typography variant="body1">Schedule: Nov 21, 2024 | 10:00 AM - 12:00 PM</Typography>
                        <Typography variant="body1">Items borrowed list:</Typography>
                        <TableContainer component={Paper} style={{ width: '100%', height: '100%' }} stickyHeader>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{ position: 'sticky', top: 0, backgroundColor: '#F2EE9D', zIndex: 1 }}
                                        >
                                            Item Name</TableCell>
                                        <TableCell
                                            sx={{ position: 'sticky', top: 0, backgroundColor: '#F2EE9D', zIndex: 1 }}
                                        >
                                            Quantity Borrowed</TableCell>
                                        <TableCell
                                            sx={{ position: 'sticky', top: 0, backgroundColor: '#F2EE9D', zIndex: 1 }}
                                        >
                                            Status
                                        </TableCell>
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
                                            <TableCell>{item.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={handleCloseModal}>Close</Button>
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
            </div>
        </ThemeProvider>
    );
}