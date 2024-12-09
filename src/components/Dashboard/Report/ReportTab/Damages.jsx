import React, { useEffect, useState } from "react";
import Appbar from "../../../Appbar/Appbar.jsx";
import Sidebar from "../../../Sidebar/Sidebar.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, useMediaQuery, Select, MenuItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#016565' },
        secondary: { main: '#000000' }
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
                    padding: '8px', // Adjust padding to match Resolved component
                },
            },
        },
    },
});

const generateSampleData = (numRows) => {
    const sampleData = [];
    for (let i = 0; i < numRows; i++) {
        sampleData.push({
            reportId: i + 1,
            serialNo: `SN${i + 1}`,
            itemName: `Item ${i + 1}`,
            dateBorrowed: `2023-10-${(i % 30) + 1}`,
            subject: `Subject ${i + 1}`,
            yearSec: `Year ${i + 1}`,
            instructor: `Instructor ${i + 1}`,
            photo: `Photo ${i + 1}`,
            accountable: `Accountable ${i + 1}`,
            status: 'Unresolved'
        });
    }
    return sampleData;
};

export default function Damages() {
    const [damagesData, setDamagesData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setDamagesData(generateSampleData(100)); // Generate 100 rows of sample data
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedData = damagesData.map(item =>
            item.reportId === id ? { ...item, status: newStatus } : item
        );
        setDamagesData(updatedData);
    };

    const filteredRows = damagesData.filter((row) => {
        return (
            row.serialNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.dateBorrowed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.yearSec.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.photo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.accountable.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100%', width: '100vw' }}>
                <Appbar page={"report"} />
                <Sidebar page={"report"} />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    {/*<Typography variant="h6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#000', textAlign: 'left' }}>*/}
                    {/*    Damages Report*/}
                    {/*</Typography>*/}
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ marginBottom: '10px', width: isSmallScreen ? '90vw' : '80vw' }}
                    /><br/>
                    <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Serial No</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Date Borrowed</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Year & Sec</TableCell>
                                    <TableCell>Instructor</TableCell>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Accountable</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.map((row) => (
                                    <TableRow key={row.reportId}>
                                        <TableCell>{row.serialNo}</TableCell>
                                        <TableCell>{row.itemName}</TableCell>
                                        <TableCell>{row.dateBorrowed}</TableCell>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell>{row.yearSec}</TableCell>
                                        <TableCell>{row.instructor}</TableCell>
                                        <TableCell>{row.photo}</TableCell>
                                        <TableCell>{row.accountable}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={row.status}
                                                onChange={(e) => handleStatusChange(row.reportId, e.target.value)}
                                            >
                                                <MenuItem value="Unresolved">Unresolved</MenuItem>
                                                <MenuItem value="Resolved">Resolved</MenuItem>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>
        </ThemeProvider>
    );
}