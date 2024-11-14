import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar.jsx';
import Appbar from '../../../Appbar/Appbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns'; 
import { parse } from 'date-fns';

const initialData = [
    
        { id: 1, date: '11/15/2024', time: '10:00 AM', teacher: 'Mr. Topacio', material: 'Beakers', description: 'Description for item 1' },
        { id: 2, date: '11/16/2024', time: '02:00 PM', teacher: 'Mr. Santos', material: 'Test Tubes', description: 'Description for item 2' },
        { id: 3, date: '11/17/2024', time: '08:00 AM', teacher: 'Ms. Perez', material: 'Microscope', description: 'Description for item 3' },
        { id: 100, date: '11/18/2024', time: '11:00 AM', teacher: 'Dr. Reyes', material: 'Bunsen Burner', description: 'Description for item 100' },
        { id: 4, date: '11/19/2024', time: '09:30 AM', teacher: 'Mr. Johnson', material: 'Pipettes', description: 'Description for item 4' },
        { id: 5, date: '11/20/2024', time: '01:15 PM', teacher: 'Ms. Walker', material: 'Beakers', description: 'Description for item 5' },
        { id: 6, date: '11/21/2024', time: '10:45 AM', teacher: 'Dr. Thompson', material: 'Test Tubes', description: 'Description for item 6' },
        { id: 7, date: '11/22/2024', time: '03:00 PM', teacher: 'Mr. Turner', material: 'Microscope', description: 'Description for item 7' },
        { id: 8, date: '11/23/2024', time: '11:30 AM', teacher: 'Ms. Lee', material: 'Bunsen Burner', description: 'Description for item 8' },
        { id: 9, date: '11/24/2024', time: '02:30 PM', teacher: 'Dr. Scott', material: 'Beakers', description: 'Description for item 9' },
        { id: 10, date: '11/25/2024', time: '09:00 AM', teacher: 'Mr. Green', material: 'Test Tubes', description: 'Description for item 10' },
        { id: 11, date: '11/26/2024', time: '04:00 PM', teacher: 'Ms. Adams', material: 'Microscope', description: 'Description for item 11' },
        { id: 12, date: '11/27/2024', time: '01:45 PM', teacher: 'Dr. Hughes', material: 'Bunsen Burner', description: 'Description for item 12' },
        { id: 13, date: '11/28/2024', time: '10:00 AM', teacher: 'Mr. Collins', material: 'Beakers', description: 'Description for item 13' },
        { id: 14, date: '11/29/2024', time: '02:15 PM', teacher: 'Ms. Robinson', material: 'Test Tubes', description: 'Description for item 14' },
        { id: 15, date: '11/30/2024', time: '03:30 PM', teacher: 'Dr. Carter', material: 'Microscope', description: 'Description for item 15' },
        { id: 16, date: '12/01/2024', time: '12:00 PM', teacher: 'Mr. Harris', material: 'Bunsen Burner', description: 'Description for item 16' },
        { id: 17, date: '12/02/2024', time: '10:30 AM', teacher: 'Ms. Clark', material: 'Beakers', description: 'Description for item 17' },
        { id: 18, date: '12/03/2024', time: '01:00 PM', teacher: 'Dr. Walker', material: 'Test Tubes', description: 'Description for item 18' },
        { id: 19, date: '12/04/2024', time: '09:45 AM', teacher: 'Mr. Moore', material: 'Microscope', description: 'Description for item 19' },
        { id: 20, date: '12/05/2024', time: '11:15 AM', teacher: 'Ms. King', material: 'Bunsen Burner', description: 'Description for item 20' },
        { id: 21, date: '12/06/2024', time: '02:00 PM', teacher: 'Dr. Scott', material: 'Beakers', description: 'Description for item 21' },
        { id: 22, date: '12/07/2024', time: '09:30 AM', teacher: 'Mr. Turner', material: 'Test Tubes', description: 'Description for item 22' },
        { id: 23, date: '12/08/2024', time: '03:00 PM', teacher: 'Ms. Perez', material: 'Microscope', description: 'Description for item 23' },
        { id: 24, date: '12/09/2024', time: '04:15 PM', teacher: 'Dr. Lee', material: 'Bunsen Burner', description: 'Description for item 24' },
        { id: 25, date: '12/10/2024', time: '01:30 PM', teacher: 'Mr. Thompson', material: 'Beakers', description: 'Description for item 25' }
      
      
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

export default function Request() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [teacher, setTeacher] = useState('');
  const [material, setMaterial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState(initialData);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = tableData.filter(row => 
    row.teacher.toLowerCase().includes(searchQuery.toLowerCase()) || 
    row.material.toLowerCase().includes(searchQuery.toLowerCase()) || 
    row.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setNewDate(new Date(row.date));
    setNewTime(parse(row.time, 'hh:mm a', new Date()));
    setTeacher(row.teacher);
    setMaterial(row.material);
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
    const updatedData = tableData.map(row => 
      row.id === selectedRow.id ? { 
        ...row, 
        date: format(newDate, 'yyyy-MM-dd'), 
        time: format(newTime, 'hh:mm a'),
        teacher: teacher, 
        material: material
      } : row
    );
    setTableData(updatedData);
    setConfirmModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setOpenModal(false);
  };

  const handleDateChange = (newDate) => {
    setNewDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setNewTime(newTime);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'MM/dd/yyyy');
  };

  const tableDataToShow = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', height: '100%', width: '100vw' }}>
        <Appbar />
        <Sidebar page={"schedule"} />
        <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
          <TextField 
            label="Search...." 
            variant="outlined" 
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: '10px', width: '80vw' }}
          />
          <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Count</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Request From</TableCell>
                  <TableCell>Material to be Borrowed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableDataToShow.map((row) => (
                  <TableRow key={row.id} onClick={() => handleOpenModal(row)} style={{ cursor: 'pointer' }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{formatDate(row.date)}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.teacher}</TableCell>
                    <TableCell>{row.material}</TableCell>
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
              bgcolor: '#FFFFFF',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: '25px'
            }}
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
              SET SCHEDULE
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={newDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} />}
              />
              <TimePicker
                label="Time"
                value={newTime}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} />}
              />
            </LocalizationProvider>
            <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Teacher" variant="outlined" fullWidth value={teacher} onChange={(e) => setTeacher(e.target.value)} />
            <TextField sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Material to be Borrowed" variant="outlined" fullWidth value={material} onChange={(e) => setMaterial(e.target.value)} />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" sx={{ color: 'maroon', borderColor: '#800000' }} onClick={handleCloseModal}>Close</Button>
              <Button variant="contained" sx={{ backgroundColor: 'maroon' }} onClick={handleOpenConfirmModal}>Confirm</Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={confirmModalOpen} onClose={handleCloseConfirmModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: '#FFFFFF', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '25px' }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
              Confirm schedule update?
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" sx={{ color: 'maroon', borderColor: '#800000' }} onClick={handleCloseConfirmModal}>Cancel</Button>
              <Button variant="contained" sx={{ backgroundColor: 'maroon' }} onClick={handleConfirmSchedule}>Confirm</Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={successModalOpen} onClose={handleCloseSuccessModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: '#FFFFFF', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '25px' }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
              Schedule Updated
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" sx={{ backgroundColor: 'maroon' }} onClick={handleCloseSuccessModal}>Close</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
