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
    { id: 17, serialNum: 'HZ101abc', name: 'Chemical X', description: 'Description 1', stock: 5, status: 'Available' },
    { id: 18, serialNum: 'HZ102def', name: 'Chemical Y', description: 'Description 2', stock: 10, status: 'Available' },
    { id: 19, serialNum: 'HZ103ghi', name: 'Chemical Z', description: 'Description 1', stock: 15, status: 'Available' },
    { id: 20, serialNum: 'HZ104jkl', name: 'Chemical A', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 21, serialNum: 'HZ105mno', name: 'Chemical B', description: 'Description 1', stock: 25, status: 'Available' },
    { id: 22, serialNum: 'HZ106pqr', name: 'Chemical C', description: 'Description 2', stock: 30, status: 'Available' },
    { id: 23, serialNum: 'HZ107stu', name: 'Chemical D', description: 'Description 1', stock: 35, status: 'Available' },
    { id: 24, serialNum: 'HZ108vwx', name: 'Chemical E', description: 'Description 2', stock: 40, status: 'Available' },
];
export default function Hazards()
{
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

    return(
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
                                        style={currentCategory === 3 ? {
                                            width: '200px',
                                            height: '80px',
                                            fontSize: '24px'
                                        } : {}}
                                    >
                                        Hazards
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


