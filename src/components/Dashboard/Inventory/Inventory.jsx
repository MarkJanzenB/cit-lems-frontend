import React, { useRef, useState } from "react";
import Appbar from "../../Appbar/Appbar.jsx";
// import "./Sidebar/Sidebar.css";
import {
    Button,
    Modal,
    Box, Typography, TextField, ButtonGroup,
    Select,
    MenuItem,
    IconButton,
    Snackbar, ThemeProvider, createTheme
} from "@mui/material";
import Sidebar from "../../Sidebar/Sidebar.jsx";
import MyPaper from "../../MyPaper.jsx";
import './Inventory.css';
import CustomTable from "../../Table and Pagination/Table.jsx";
import CustomTablePagination from "../../Table and Pagination/Pagination.jsx";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'quantity', headerName: 'quantity' },
    { field: 'status', headerName: 'Status' },
];



export default function Inventory() {
    const roleid = localStorage.getItem("userRole");
    const jwtToken = localStorage.getItem("jwtToken");
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [data, setData] = useState([{}]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [transition, setTransition] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [newItemCategory, setNewItemCategory] = useState(1);
    const newInvId = useRef(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [editConsumable, setEditConsumable] = useState(false);
    const [editDataName, setEditDataName] = useState('');
    const [editData, setEditData] = useState({});

    const theme = createTheme({
        palette: {
            primary: { main: '#016565' },
            secondary: { main: '#000000' }
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        backgroundColor: '#016565',
                        color: '#FFFFFF',
                    },
                    body: {
                        fontSize: 14,
                    },
                },
            },
        },
    });

    const [newItem, setNewItem] = useState({
        item_name: '',
        unique_id: '',
        group_id: null,
        inventory: {inventory_id:0}
    });

    const [newConsumable, setNewConsumable] = useState({
        unit: '',
        name: '',
        item_category:{category_id:0},
        quantity:0,
        description:'',
    })

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentStep(1);
        setError('');
    }

    const handleModalEditClose = () => {
        setOpenModalEdit(false);
        setError('');
    }

    const handleSnackbarClose = (event, reason) => {
        setOpenSnackbar(false);
    }

    const SnackbarAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const handleModalBack = () => {
        setCurrentStep(1);
    };

    const fetchData = async (categoryId) => {
        if(categoryId != 4){
            const response = await axios.get(`http://localhost:8080/inventory/getinventorybycategory?categoryId=${categoryId+1}`, {
                headers: {
                    "authorization": `Bearer ${jwtToken}`,
                }});
            setData(response.data);
        }else{
            const response = await axios.get("http://localhost:8080/inventory/getAllInventory", {
                headers: {
                    "authorization": `Bearer ${jwtToken}`,
                }});
            setData(response.data);
        }
    }

    const handleViewListClick = (categoryId) => {
        setTransition(true);
        setTimeout(() => {
            setCurrentCategory(categoryId);
            fetchData(categoryId);
            setShowTable(true);
            setTransition(false);
            setPage(0);
        }, 500);
    };

    const handleViewAllItemsClick = (categoryId) => {
        setTransition(true);
        setTimeout(() => {
            setCurrentCategory(categoryId);
            fetchData(categoryId);
            setShowTable(true);
            setTransition(false);
        }, 500);
    };

    const handleRemoveItem = (category_id) => {
        axios.delete(`http://localhost:8080/inventory/delete/${category_id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                fetchData(currentCategory);
                setSnackbarText(response.data.name + " has been successfully removed.");
                setOpenSnackbar(true);
            })
            .catch(error)
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
        if(roleid != 1){
            setEditData(row);
            setEditDataName(row.name);
            if(row.item_category.category_id == 1){
                setEditConsumable(true);
            }else{
                setEditConsumable(false);
            }
            setOpenModalEdit(true);
        }

    };

    const handleAddClick = () => {
        setOpenModal(true);
    };

    const handleInputChangeCategory = (e) => {
        const { name, value } = e.target;
        if(name == "category"){
            setNewItemCategory(value);
        }

    };

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setError('');

        if(newItemCategory != 1){
            setNewItem(prevState => ({
                ...prevState,
                [name]: value
            }));
        }else{
            setNewConsumable(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleInputChangeEdit = (e) => {
        const {name, value} = e.target;
        setError('');

        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleNext = () => {
        setCurrentStep(2);

        if(newItemCategory == 1){
            setNewConsumable(prevState => ({
                ...prevState,
                item_category: {category_id: newItemCategory}
            }));
        }
    }

    const handleAddItem = () => {
        if(newItemCategory == 1){
            axios.post("http://localhost:8080/inventory/addinventory", newConsumable, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
                .then(response => {
                    setOpenModal(false);
                    setCurrentStep(1);
                    fetchData(currentCategory);
                    setOpenSnackbar(true);
                    setSnackbarText("Item added");
                })
                .catch(error => {
                    if(error.response.status == 409){
                        setError("Item already exists. Did you mean add stock?");
                    }else{
                        setError("An unexpected error occured.");
                    }
                })

        }else{
            axios.get(`http://localhost:8080/inventory/isinventoryexists?inventoryName=${newItem.item_name}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
                .then(response => {
                    setError("Item already exists. Did you mean add stock?");
                })
                .catch(error => {
                    if(error.response.status == 409){
                        axios.post("http://localhost:8080/inventory/addinventory", {
                            unit: null,
                            name: newItem.item_name,
                            item_category:{
                                category_id:newItemCategory
                            },
                            quantity: 1
                        },{
                            headers:{
                                "Authorization": `Bearer ${jwtToken}`
                            }
                        })
                            .then(response => {
                                newInvId.current = response.data.inventory_id;
                                axios.post("http://localhost:8080/item/insertitem", {
                                    item_name: newItem.item_name,
                                    unique_id: newItem.unique_id,
                                    group_id: newItem.group_id,
                                    inventory: {
                                        inventory_id: response.data.inventory_id
                                    }
                                },{
                                    headers:{
                                        "Authorization": `Bearer ${jwtToken}`
                                    }
                                })
                                    .then(response => {
                                        setOpenModal(false);
                                        setCurrentStep(1);
                                        fetchData(currentCategory);
                                        setOpenSnackbar(true);
                                        setSnackbarText("Item added");
                                    })
                                    .catch(error => {
                                        if(error.response.status == 409){
                                            setError(error.response.data);
                                            axios.delete(`http://localhost:8080/inventory/delete/${newInvId.current}`, {
                                                headers:{
                                                    "Authorization": `Bearer ${jwtToken}`
                                                }
                                            })
                                                .then(response => {
                                                })
                                                .catch(error => {
                                                })
                                        }else{
                                            setError("An unexpected error occured.");
                                        }
                                    })
                            })
                            .catch(error => {
                                setError("An unexpected error occured.");
                            })
                    }else{
                        setError("An unexpected error occured.");
                    }
                })
        }
    };

    const handleSave = () => {
        console.log(editData)
        axios.put(`http://localhost:8080/inventory/updateinventory?id=${editData.inventory_id}`, editData, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                setSnackbarText("Item successfully updated");
                setOpenSnackbar(true);
                setOpenModalEdit(false);
                fetchData(currentCategory);
            })
            .catch(error => {
                if(error.response.status == 409){
                    setError(error.response.data);
                }else{
                    setError("An unexpected error occurred. Please check the details and try again.");
                }
            })
    }

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
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
                                        <img src={"/consumable.gif"} style={{width: '200px', height: '200px'}}
                                             onClick={() => handleViewListClick(0)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about consumables</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(0)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                    <h1>Equipment</h1>
                                        <img src={"/equipment.gif"} style={{ width: '200px', height: '200px' }}
                                             onClick={() => handleViewListClick(1)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about equipment</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(1)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Glassware</h1>
                                        <img src={"/glassware.gif"} style={{ width: '200px', height: '200px' }} onClick={() => handleViewListClick(2)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>This is a short description about glassware</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(2)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Hazards</h1>
                                        <img src={"/hazardous.gif"} style={{ width: '200px', height: '200px' }}
                                             onClick={() => handleViewListClick(3)}/>
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
                                        width: '100%',
                                    }}>


                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                            <Button
                                                style={currentCategory === 0 ? {
                                                    width: '200px',
                                                    height: '80px',
                                                    fontSize: '24px',
                                                } : {}}
                                                onClick={() => handleViewListClick(0)}
                                            >
                                                {currentCategory === 0 ? 'Consumables' :
                                                    <img src="/consumable.gif" alt="Consumables"
                                                         style={{width: '50px', height: '50px'}}/>}
                                            </Button>
                                            <Button
                                                style={currentCategory === 1 ? {
                                                    width: '200px',
                                                    height: '80px',
                                                    fontSize: '24px',
                                                } : {}}
                                                onClick={() => handleViewListClick(1)}
                                            >
                                                {currentCategory === 1 ? 'Equipment' :
                                                    <img src="/equipment.gif" alt="Equipment"
                                                         style={{width: '50px', height: '50px'}}/>}
                                            </Button>
                                            <Button
                                                style={currentCategory === 2 ? {
                                                    width: '200px',
                                                    height: '80px',
                                                    fontSize: '24px',
                                                } : {}}
                                                onClick={() => handleViewListClick(2)}
                                            >
                                                {currentCategory === 2 ? 'Glassware' :
                                                    <img src="/glassware.gif" alt="Glassware"
                                                         style={{width: '50px', height: '50px'}}/>}
                                            </Button>
                                            <Button
                                                style={currentCategory === 3 ? {
                                                    width: '200px',
                                                    height: '80px',
                                                    fontSize: '24px',
                                                } : {}}
                                                onClick={() => handleViewListClick(3)}
                                            >
                                                {currentCategory === 3 ? 'Hazards' :
                                                    <img src="/hazardous.gif" alt="Hazards"
                                                         style={{width: '50px', height: '50px'}}/>}
                                            </Button>

                                        </ButtonGroup>
                                        <div style={{justifyContent: 'space-between'}}>
                                            <Button onClick={handleBack}><img src={"/close.gif"} style={{
                                                width: '50px',
                                                height: '50px',
                                            }}/></Button>
                                        </div>
                                        {/*<h1>{categories[currentCategory]}</h1>*/}
                                    </div>

                                    <br/>
                                    <CustomTable
                                        columns={columns}
                                        data={paginatedData}
                                        onRowClick={handleRowClick}
                                        onRemoveClick={handleRemoveItem}
                                        roleid={roleid}
                                    />
                                    <CustomTablePagination
                                        count={data.length}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        onAddClick={handleAddClick}
                                        roleid={roleid}
                                    />
                                </>
                            )}
                        </MyPaper>
                        <Modal open={openModal} onClose={handleModalClose}>
                            <Box>
                                {currentStep === 1 && (
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
                                            borderRadius: '25px',
                                        }}
                                    >
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                            SELECT CATEGORY
                                        </Typography>
                                        <Select
                                            name="category"
                                            value={newItemCategory}
                                            onChange={handleInputChangeCategory}
                                            sx={{ color: '#000' }}
                                        >
                                            <MenuItem value={1}>Consumables</MenuItem>
                                            <MenuItem value={2}>Equipment</MenuItem>
                                            <MenuItem value={3}>Glassware</MenuItem>
                                            <MenuItem value={4}>Hazards</MenuItem>
                                        </Select>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }}
                                            onClick={handleNext}
                                        >
                                            Next
                                        </Button>
                                    </Box>

                                )}

                                {currentStep === 2 && (
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
                                            borderRadius: '25px',
                                        }}
                                    >
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                            ADD ITEM
                                        </Typography>
                                        {newItemCategory != 1 && (
                                            <TextField
                                                name="unique_id"
                                                value={newItem.serialNum}
                                                onChange={handleInputChange}
                                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                                label="Serial Number"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                        <TextField
                                            name={newItemCategory !== 1 ? 'item_name' : 'name'}
                                            value={newItemCategory !== 1 ? newItem.item_name : newItem.name}
                                            onChange={handleInputChange}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            name="description"
                                            value={newItem.description}
                                            onChange={handleInputChange}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {newItemCategory == 1 && (
                                            <TextField
                                                name="quantity"
                                                value={newItem.stock}
                                                onChange={handleInputChange}
                                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                                label="Quantity"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                        {error && <Typography color="error" sx={{mt:2}}>{error}</Typography>}
                                        <Box display="flex" justifyContent="space-between" mt={2}>
                                            <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={handleModalBack}>
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }}
                                                onClick={handleAddItem}
                                            >
                                                Add Item
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Modal>
                        <Modal open={openModalEdit} onClose={handleModalEditClose}>
                            <Box>
                                {editConsumable ? (
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
                                            borderRadius: '25px',
                                        }}
                                    >
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                            Edit {editDataName}
                                        </Typography>
                                        <TextField
                                            name={'name'}
                                            value={editData.name}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            name="description"
                                            value={editData.description}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {/* Improve: Modify to only allow decimals as input */}
                                        <TextField
                                            name="quantity"
                                            value={editData.quantity}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Quantity"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        {error && <Typography color="error" sx={{mt:2}}>{error}</Typography>}
                                        <Box display="flex" justifyContent="space-between" mt={2}>
                                            <Button variant="outlined" sx={{ color: '#800000', borderColor: '#800000' }} onClick={handleModalEditClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: '#800000', color: '#FFF', '&:hover': { backgroundColor: '#5c0000' } }}
                                                onClick={handleSave}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
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
                                            borderRadius: '25px',
                                        }}
                                    >
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}>
                                            Edit nani kashira
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarText}
                action={SnackbarAction}
            />
        </ThemeProvider>
    );
}