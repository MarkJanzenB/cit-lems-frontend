import React, { useState } from 'react';
import Appbar from "../../Appbar/Appbar.jsx";
import { Button, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar.jsx";

const initialData = [
    { id: 1, materialId: '001', materialName: 'Microscope', dateBorrowed: '2023-10-01', qty: 1, group: 'A', yearSec: '3A', instructor: 'Dr. Smith', photo: 'photo1.jpg', accountable: 'John Doe', status: 'Damaged' },
    // Add more initial data as needed
];

export default function Reports() {
    const [tab, setTab] = useState(0);
    const [data, setData] = useState(initialData);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <>
            <Appbar page={"reports"} />
            <br/><br/><br/><br/>
            <Link to={"/dashboard"}><Button><img src={"/orangeybackbutton.gif"} style={{ width: '50px', height: '50px' }} /></Button></Link>
            <Tabs value={tab} onChange={handleTabChange}>
                <Tab label="Damages" />
                {/* Add more tabs as needed */}
            </Tabs>
            {tab === 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ITEM ID</TableCell>
                                <TableCell>MATERIAL NAME</TableCell>
                                <TableCell>DATE BORROWED</TableCell>
                                <TableCell>QTY</TableCell>
                                <TableCell>GROUP NAME</TableCell>
                                <TableCell>YR & SEC</TableCell>
                                <TableCell>INSTRUCTOR</TableCell>
                                <TableCell>PHOTO</TableCell>
                                <TableCell>ACCOUNTABLE</TableCell>
                                <TableCell>STATUS</TableCell>
                                <TableCell>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.materialId}</TableCell>
                                    <TableCell>{row.materialName}</TableCell>
                                    <TableCell>{row.dateBorrowed}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>{row.group}</TableCell>
                                    <TableCell>{row.yearSec}</TableCell>
                                    <TableCell>{row.instructor}</TableCell>
                                    <TableCell><img src={row.photo} alt="material" style={{ width: '50px', height: '50px' }} /></TableCell>
                                    <TableCell>{row.accountable}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}