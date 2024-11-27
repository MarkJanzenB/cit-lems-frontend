import React, { useState } from "react";
import CustomTable from "../../../Table and Pagination/Table.jsx";
import CustomTablePagination from "../../../Table and Pagination/Pagination.jsx";
import {
    Button,
    Modal,
    Box, Typography, TextField, ButtonGroup
} from "@mui/material";
import MyPaper from "../../../MyPaper.jsx";

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'serialNum', headerName: 'SerialNo.' },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'stock', headerName: 'InStock' },
    { field: 'status', headerName: 'Status' },
];

const dummyData1 = [
    { id: 9, serialNum: 'GL101abc', name: 'Beaker', description: 'Description 1', stock: 15, status: 'Available' },
    { id: 10, serialNum: 'GL102def', name: 'Beaker', description: 'Description 2', stock: 25, status: 'Available' },
    { id: 11, serialNum: 'GL103ghi', name: 'Flask', description: 'Description 1', stock: 30, status: 'Available' },
    { id: 12, serialNum: 'GL104jkl', name: 'Flask', description: 'Description 2', stock: 40, status: 'Available' },
    { id: 13, serialNum: 'GL105mno', name: 'Test Tube', description: 'Description 1', stock: 50, status: 'Available' },
    { id: 14, serialNum: 'GL106pqr', name: 'Test Tube', description: 'Description 2', stock: 60, status: 'Available' },
    { id: 15, serialNum: 'GL107stu', name: 'Pipette', description: 'Description 1', stock: 70, status: 'Available' },
    { id: 16, serialNum: 'GL108vwx', name: 'Pipette', description: 'Description 2', stock: 80, status: 'Available' },
];


export default function Equipments() {
    const [showTable, setShowTable] = useState(true);
    const [data, setData] = useState(dummyData1);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [transition, setTransition] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [newItem, setNewItem] = useState({
        id: '',
        serialNum: '',
        name: '',
        description: '',
        stock: '',
        status: ''
    });

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <MyPaper>
                    {showTable && (
                        <>
                            <div className="table-slide-up" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button
                                        style={currentCategory === 1 ? {
                                            width: '200px',
                                            height: '80px',
                                            fontSize: '24px'
                                        } : {}}
                                    >
                                        Equipments
                                    </Button>
                                </ButtonGroup>
                            </div>

                            <CustomTable
                                columns={columns}
                                data={paginatedData}
                            />
                            <CustomTablePagination
                                count={data.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}
                </MyPaper>
            </div>
        </>
    )
}


