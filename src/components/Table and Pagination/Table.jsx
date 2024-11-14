import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const CustomTable = ({ columns, data, onRowClick, onRemoveClick, onDeleteClick, page }) => {
    const handleActionClick = (id) => {
        if (page === 'report') {
            onDeleteClick(id);
        } else {
            onRemoveClick(id);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field}>{column.headerName}</TableCell>
                        ))}
                        <TableCell>RemoveItem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
                            {columns.map((column) => (
                                <TableCell key={column.field}>{row[column.field]}</TableCell>
                            ))}
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); handleActionClick(row.id); }}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;