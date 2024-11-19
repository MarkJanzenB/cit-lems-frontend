import React, { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "../../../Appbar/Appbar.jsx";
import Sidebar from "../../../Sidebar/Sidebar.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, TextField, useMediaQuery } from "@mui/material";
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
                },
            },
        },
    },
});

export default function Damages() {
    const [damagesData, setDamagesData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchDamagesData();
    }, []);

    const fetchDamagesData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/damages');
            console.log("Fetched data:", response.data);
            setDamagesData(response.data);
        } catch (error) {
            console.error("Error fetching damages data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/damages/${id}`);
            fetchDamagesData();
        } catch (error) {
            console.error("Error deleting damage record:", error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = damagesData.filter((row) => {
        return (
            row.materialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.dateBorrowed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.qty.toString().includes(searchQuery.toLowerCase()) ||
            row.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                <Appbar />
                <Sidebar page={"report"} />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ marginBottom: '10px', width: isSmallScreen ? '90vw' : '80vw' }}
                    />
                    <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>MATERIAL ID</TableCell>
                                    <TableCell>MATERIAL NAME</TableCell>
                                    <TableCell>DATE BORROWED</TableCell>
                                    <TableCell>QTY</TableCell>
                                    <TableCell>GROUP#</TableCell>
                                    <TableCell>YR & SEC</TableCell>
                                    <TableCell>INSTRUCTOR</TableCell>
                                    <TableCell>PHOTO</TableCell>
                                    <TableCell>ACCOUNTABLE</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.map((row) => (
                                    <TableRow key={row.reportId}>
                                        <TableCell>{row.materialId}</TableCell>
                                        <TableCell>{row.materialName}</TableCell>
                                        <TableCell>{row.dateBorrowed}</TableCell>
                                        <TableCell>{row.qty}</TableCell>
                                        <TableCell>{row.group}</TableCell>
                                        <TableCell>{row.yearSec}</TableCell>
                                        <TableCell>{row.instructor}</TableCell>
                                        <TableCell>{row.photo}</TableCell>
                                        <TableCell>{row.accountable}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(row.reportId)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30]}
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