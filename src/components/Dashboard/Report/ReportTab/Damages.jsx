import React from "react";
import Appbar from "../../../Appbar/Appbar.jsx";
import Sidebar from "../../../Sidebar/Sidebar.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const dummyData = [
    // Add your dummy data here
];

export default function Damages() {
    const handleDelete = (id) => {
        // Implement delete logic here
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <Appbar />
            <Sidebar page={"reports"} />
            <TableContainer component={Paper} style={{ width: '100%', padding: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>MATERIAL ID#</TableCell>
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
                        {dummyData.map((row) => (
                            <TableRow key={row.id}>
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
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}