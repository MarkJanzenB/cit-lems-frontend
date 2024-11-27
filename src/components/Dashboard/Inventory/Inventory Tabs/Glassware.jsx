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
    { id: 1, serialNum: 'AL101asd', name: 'Alcohol Lamp', description: 'Description 1', stock: 10, status: 'Available' },
    { id: 2, serialNum: 'AL102zxc', name: 'Alcohol Lamp', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 3, serialNum: 'M11qwe', name: 'Microscope', description: 'Description 1', stock: 10, status: 'Available' },
    { id: 4, serialNum: 'M012qaz', name: 'Microscope', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 5, serialNum: 'AL101asd', name: 'Alcohol Lamp', description: 'Description 1', stock: 10, status: 'Available' },
    { id: 6, serialNum: 'AL102zxc', name: 'Alcohol Lamp', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 7, serialNum: 'M11qwe', name: 'Microscope', description: 'Description 1', stock: 10, status: 'Available' },
    { id: 8, serialNum: 'M012qaz', name: 'Microscope', description: 'Description 2', stock: 20, status: 'Available' },
];

export default function Glassware()
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
                                        style={currentCategory === 2 ? {
                                            width: '200px',
                                            height: '80px',
                                            fontSize: '24px'
                                        } : {}}
                                    >
                                    Glassware
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
