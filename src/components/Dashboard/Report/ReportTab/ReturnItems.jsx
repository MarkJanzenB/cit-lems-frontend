import React from "react";
import Appbar from "../../../Appbar/Appbar.jsx";
import Sidebar from "../../../Sidebar/Sidebar.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const returnItemsData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    materialName: `Material Name ${index + 1}`,
    dateBorrowed: `2023-10-${index + 1}`,
    qty: Math.floor(Math.random() * 10) + 1,
    group: `Group ${index + 1}`,
    yearSec: `Year & Sec ${index + 1}`,
    instructor: `Instructor ${index + 1}`,
    photo: `Photo ${index + 1}`,
    accountable: `Accountable ${index + 1}`,
    status: `Status ${index + 1}`
}));

const theme = createTheme({
    palette: {
        primary: { main: '#016565' },
        secondary: { main: '#000000' }
    }
});

export default function ReturnItems() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        // Implement delete logic here
    };

    const displayedRows = returnItemsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                <Appbar />
                <Sidebar page={"report"} style={{ position: 'fixed', height: '100vh', width: '250px' }} />
                <div style={{ marginLeft: '15px', width: 'calc(100% - 270px)', padding: '20px', marginTop: '100px' }}>
                    <TableContainer component={Paper} style={{ width: '100%', height: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
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
                                    <TableRow key={row.id}>
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
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30]}
                            component="div"
                            count={returnItemsData.length}
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