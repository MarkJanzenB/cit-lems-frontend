import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const CustomTable = ({ columns, data, onRowClick, onRemoveClick, roleid }) => {
    //removed the page from the props
    const handleActionClick = (id) => {
        onRemoveClick(id);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead style={{fontFamily:'Poppins'}}>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field}>{column.headerName}</TableCell>
                        ))}
                        {roleid != 1 && <TableCell>RemoveItem</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
                            {columns.map((column) => (
                                <TableCell key={column.field} style={{fontFamily:'Poppins'}}>{row[column.field]}</TableCell>
                            ))}
                            {roleid != 1 && (
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); handleActionClick(row.inventory_id); }}>
                                        Remove
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;