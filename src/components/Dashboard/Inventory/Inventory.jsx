import React, { useState } from "react";
import Appbar from "../../Appbar/Appbar.jsx";
import {
    Button,
    Modal,
    Box, Typography, TextField, ButtonGroup
} from "@mui/material";
import Sidebar from "../../Sidebar/Sidebar.jsx";
import MyPaper from "../../MyPaper.jsx";
import './Inventory.css';
import CustomTable from "../../Table and Pagination/Table.jsx";
import CustomTablePagination from "../../Table and Pagination/Pagination.jsx";

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'serialNum', headerName: 'SerialNo.' },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'stock', headerName: 'InStock' },
    { field: 'status', headerName: 'Status' },
];

const dummyData1 = [
    { id: 1, serialNum: 'AL101asd', name: 'Alcohol Lamp',  description: 'Description 1', stock: 10, status: 'Available' },
    { id: 2, serialNum: 'AL102zxc', name: 'Alcohol Lamp', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 3, serialNum: 'M11qwe', name: 'Microscope',  description: 'Description 1', stock: 10, status: 'Available' },
    { id: 4, serialNum: 'M012qaz', name: 'Microscope', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 5, serialNum: 'AL101asd', name: 'Alcohol Lamp',  description: 'Description 1', stock: 10, status: 'Available' },
    { id: 6, serialNum: 'AL102zxc', name: 'Alcohol Lamp', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 7, serialNum: 'M11qwe', name: 'Microscope',  description: 'Description 1', stock: 10, status: 'Available' },
    { id: 8, serialNum: 'M012qaz', name: 'Microscope', description: 'Description 2', stock: 20, status: 'Available' },
];
const dummyData2 = [
    { id: 1, serialNum: 'GL101abc', name: 'Beaker', description: 'Description 1', stock: 15, status: 'Available' },
    { id: 2, serialNum: 'GL102def', name: 'Beaker', description: 'Description 2', stock: 25, status: 'Available' },
    { id: 3, serialNum: 'GL103ghi', name: 'Flask', description: 'Description 1', stock: 30, status: 'Available' },
    { id: 4, serialNum: 'GL104jkl', name: 'Flask', description: 'Description 2', stock: 40, status: 'Available' },
    { id: 5, serialNum: 'GL105mno', name: 'Test Tube', description: 'Description 1', stock: 50, status: 'Available' },
    { id: 6, serialNum: 'GL106pqr', name: 'Test Tube', description: 'Description 2', stock: 60, status: 'Available' },
    { id: 7, serialNum: 'GL107stu', name: 'Pipette', description: 'Description 1', stock: 70, status: 'Available' },
    { id: 8, serialNum: 'GL108vwx', name: 'Pipette', description: 'Description 2', stock: 80, status: 'Available' },
];
const dummyData3 = [
    { id: 17, serialNum: 'HZ101abc', name: 'Chemical X', description: 'Description 1', stock: 5, status: 'Available' },
    { id: 18, serialNum: 'HZ102def', name: 'Chemical Y', description: 'Description 2', stock: 10, status: 'Available' },
    { id: 19, serialNum: 'HZ103ghi', name: 'Chemical Z', description: 'Description 1', stock: 15, status: 'Available' },
    { id: 20, serialNum: 'HZ104jkl', name: 'Chemical A', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 21, serialNum: 'HZ105mno', name: 'Chemical B', description: 'Description 1', stock: 25, status: 'Available' },
    { id: 22, serialNum: 'HZ106pqr', name: 'Chemical C', description: 'Description 2', stock: 30, status: 'Available' },
    { id: 23, serialNum: 'HZ107stu', name: 'Chemical D', description: 'Description 1', stock: 35, status: 'Available' },
    { id: 24, serialNum: 'HZ108vwx', name: 'Chemical E', description: 'Description 2', stock: 40, status: 'Available' },
];
const dummyData4 = [
    { id: 25, serialNum: 'EQ101abc', name: 'Bunsen Burner', description: 'Description 1', stock: 5, status: 'Available' },
    { id: 26, serialNum: 'EQ102def', name: 'Bunsen Burner', description: 'Description 2', stock: 10, status: 'Available' },
    { id: 27, serialNum: 'EQ103ghi', name: 'Thermometer', description: 'Description 1', stock: 15, status: 'Available' },
    { id: 28, serialNum: 'EQ104jkl', name: 'Thermometer', description: 'Description 2', stock: 20, status: 'Available' },
    { id: 29, serialNum: 'EQ105mno', name: 'Balance Scale', description: 'Description 1', stock: 25, status: 'Available' },
    { id: 30, serialNum: 'EQ106pqr', name: 'Balance Scale', description: 'Description 2', stock: 30, status: 'Available' },
    { id: 31, serialNum: 'EQ107stu', name: 'Centrifuge', description: 'Description 1', stock: 35, status: 'Available' },
    { id: 32, serialNum: 'EQ108vwx', name: 'Centrifuge', description: 'Description 2', stock: 40, status: 'Available' },
];
const allData = [...dummyData1, ...dummyData2, ...dummyData3, ...dummyData4];
const categories = ['Consumables', 'Equipment', 'Glassware', 'Hazards', 'All items'];
const categoryDataMap = {
    'Consumables': dummyData1,
    'Equipment': dummyData2,
    'Glassware': dummyData3,
    'Hazards': dummyData4,
    'All items':allData,
};

export default function Inventory() {
    const [showTable, setShowTable] = useState(false);
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
    }

    const handleViewListClick = (categoryIndex) => {
        setTransition(true);
        setTimeout(() => {
            setCurrentCategory(categoryIndex);
            setData(categoryDataMap[categories[categoryIndex]]);
            setShowTable(true);
            setTransition(false);
        }, 500);
    };

    const handleViewAllItemsClick = (categoryIndex) => {
        setTransition(true);
        setTimeout(() => {
            setData(allData);
            setCurrentCategory(categoryIndex)
            setData(categoryDataMap[categories[categoryIndex]]);
            setShowTable(true);
            setTransition(false);
        }, 500);
    };

    const handleRemoveItem = (id) => {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        categoryDataMap[categories[currentCategory]] = updatedData;

        const updatedAllData = categoryDataMap['All items'].filter(item => item.id !== id);
        categoryDataMap['All items'] = updatedAllData;
    };

    const handleBack = () => {
        setShowTable(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (row) => {
        console.log('Row clicked:', row);
    };

    const handleAddClick = () => {
        setOpenModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddItem = () => {
        const updatedData = [...data, { ...newItem, id: data.length + 1 }];
        setData(updatedData);
        categoryDataMap[categories[currentCategory]] = updatedData;
        categoryDataMap['All items'] = [...categoryDataMap['All items'], { ...newItem, id: categoryDataMap['All items'].length + 1 }];
        setOpenModal(false);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Appbar page={"inventory"} />
            <div className="inventory-container">
                <Sidebar page={"inventory"} />
                <div className="inventory-content">
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MyPaper>
                            {!showTable && (
                                <div className={transition ? 'fade-slide-up' : ''} style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Consumables</h1>
                                        <img src={"/consumable.gif"} style={{ width: '200px', height: '200px' }} />
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about consumables</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(0)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Equipment</h1>
                                        <img src={"/equipment.gif"} style={{ width: '200px', height: '200px' }} />
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about equipment</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(1)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Glassware</h1>
                                        <img src={"/glassware.gif"} style={{ width: '200px', height: '200px' }} />
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about glassware</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(2)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Hazards</h1>
                                        <img src={"/hazardous.gif"} style={{ width: '200px', height: '200px' }} />
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about hazardsssss</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(3)}>View List</Button>
                                    </MyPaper>
                                </div>
                            )}
                            <br />
                            {!showTable && (
                                <div className={transition ? 'fade-slide-up' : ''} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <MyPaper width={"95%"} height={"8%"}>
                                        <Button onClick={()=>handleViewAllItemsClick(4)}>View All Items</Button>
                                    </MyPaper>
                                </div>
                            )}
                            {showTable && (
                                <>
                                    <div className="table-slide-up" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Button onClick={handleBack}><img src={"/back1.gif"} style={{
                                            width: '30px',
                                            height: '30px'
                                        }}/></Button>

                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                            <Button
                                                style={currentCategory === 0 ? { width: '200px', height: '80px', fontSize: '24px',  } : {}}
                                                 onClick={()=>handleViewListClick(0)}
                                            >
                                                {currentCategory === 0 ? 'Consumables' : <img src="/consumable.gif" alt="Consumables" style={{ width: '50px', height: '50px' }} />}
                                            </Button>
                                            <Button
                                                style={currentCategory === 1 ? { width: '200px', height: '80px', fontSize: '24px', } : {}}
                                                onClick={() =>handleViewListClick(1)}
                                            >
                                                {currentCategory === 1 ? 'Equipment' : <img src="/equipment.gif" alt="Equipment" style={{ width: '50px', height: '50px' }} />}
                                            </Button>
                                            <Button
                                                style={currentCategory === 2 ? { width: '200px', height: '80px', fontSize: '24px', } : {}}
                                                onClick={() =>handleViewListClick(2)}
                                            >
                                                {currentCategory === 2 ? 'Glassware' : <img src="/glassware.gif" alt="Glassware" style={{width: '50px', height: '50px' }} />}
                                            </Button>
                                            <Button
                                                style={currentCategory === 3 ? { width: '200px', height: '80px', fontSize: '24px',  } : {}}
                                                onClick={() =>handleViewListClick(3)}
                                            >
                                                {currentCategory === 3 ? 'Hazards' : <img src="/hazardous.gif" alt="Hazards" style={{ width: '50px', height: '50px' }} />}
                                            </Button>
                                        </ButtonGroup>

                                        {/*<h1>{categories[currentCategory]}</h1>*/}
                                    </div>


                                    <CustomTable
                                        columns={columns}
                                        data={paginatedData}
                                        onRowClick={handleRowClick}
                                        onRemoveClick={handleRemoveItem}
                                    />
                                    <CustomTablePagination
                                        count={data.length}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        onAddClick={handleAddClick}
                                    />
                                </>
                            )}
                        </MyPaper>
                        <Modal open={openModal} onClose={handleModalClose}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 500,
                                    bgcolor: '#F2EE9D',
                                    boxShadow: 24,
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    borderRadius: '25px'
                                }}
                            >
                                <Typography variant={'h6'} component={'div'} sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                    ADD ITEM
                                </Typography>
                                <TextField name="serialNum" value={newItem.serialNum} onChange={handleInputChange} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Serial Number" variant="outlined" fullWidth />
                                <TextField name="name" value={newItem.name} onChange={handleInputChange} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Name" variant="outlined" fullWidth />
                                <TextField name="description" value={newItem.description} onChange={handleInputChange} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Description" variant="outlined" fullWidth />
                                <TextField name="stock" value={newItem.stock} onChange={handleInputChange} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Stock" variant="outlined" fullWidth />
                                <TextField name="status" value={newItem.status} onChange={handleInputChange} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} label="Status" variant="outlined" fullWidth />
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={handleModalClose}>Close</Button>
                                    <Button variant="contained" sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }} onClick={handleAddItem}>AddItem</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}