// ReturnItems.jsx
import React from "react";
import Appbar from "../../../Appbar/Appbar.jsx";
import Sidebar from "../../../Sidebar/Sidebar.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const returnItemsData = [
    // Add your dummy data for return items here
];

export default function ReturnItems() {
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
                            <TableCell>ITEM ID#</TableCell>
                            <TableCell>ITEM NAME</TableCell>
                            <TableCell>DATE RETURNED</TableCell>
                            <TableCell>QTY</TableCell>
                            <TableCell>RETURNED BY</TableCell>
                            <TableCell>CONDITION</TableCell>
                            <TableCell>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {returnItemsData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.itemId}</TableCell>
                                <TableCell>{row.itemName}</TableCell>
                                <TableCell>{row.dateReturned}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell>{row.returnedBy}</TableCell>
                                <TableCell>{row.condition}</TableCell>
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
