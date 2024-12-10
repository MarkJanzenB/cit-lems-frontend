import React, { useRef, useState, useEffect} from "react";
import Appbar from "../../Appbar/Appbar.jsx";
import {
    Button, Modal, Box, Typography, TextField,
    ButtonGroup, Select, MenuItem, IconButton, InputLabel,
    Snackbar, ThemeProvider, createTheme, FormControl
} from "@mui/material";
import Sidebar from "../../Sidebar/Sidebar.jsx";
import MyPaper from "../../MyPaper.jsx";
import './Inventory.css';
import CustomTable from "../../Table and Pagination/Table.jsx";
import CustomTablePagination from "../../Table and Pagination/Pagination.jsx";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'unit', headerName: 'Unit' },
    { field: 'status', headerName: 'Status' },
];




export default function Inventory() {
    const navigate = useNavigate();
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
    const [newItemCategory, setNewItemCategory] = useState(0);
    const newInvId = useRef(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [editConsumable, setEditConsumable] = useState(false);
    const [editDataName, setEditDataName] = useState('');
    const [editData, setEditData] = useState({});
    const [editDataOldQty, setEditDataOldQty] = useState(0);
    const [message, setMessage] = useState('');

    const theme = createTheme({
        palette: {
            primary: { main: '#016565' },
            secondary: { main: '#f2ee9d' }
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
        unit:'',
        item_category:{category_id: 1},
        description:'',
        group_id: null,
        inventory: {inventory_id:0},
        quantity: 1,
    });

    const [newConsumable, setNewConsumable] = useState({
        unit: '',
        name: '',
        item_category:{category_id: 1},
        quantity:0,
        description:'',
    });

    // const [newEquipment, setNewEquipment] = useState({
    //     unit: '',
    //     name: '',
    //     item_category: { category_id: 2 },
    //     quantity: 0,
    //     description: '',
    // });
    //
    // const [newGlassware, setNewGlassware] = useState({
    //     unit: '',
    //     name: '',
    //     item_category: { category_id: 3},
    //     quantity: 0,
    //     description: '',
    // });
    //
    // const [newHazards, setNewHazards] = useState({
    //     unit: '',
    //     name: '',
    //     item_category: { category_id: 4 },
    //     quantity: 0,
    //     description: '',
    // });

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
            console.log(response.data);
            setData(response.data);
        }else{
            const response = await axios.get("http://localhost:8080/inventory/getAllInventory", {
                headers: {
                    "authorization": `Bearer ${jwtToken}`,
                }});
            console.log(response.data);
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
        if (roleid != 1) {
            setEditData(row);
            setEditDataName(row.name);
            setEditDataOldQty(row.quantity);
            if (row.item_category.category_id == 1) {
                setEditConsumable(true);
            } else {
                setEditConsumable(false);
            }
            setOpenModalEdit(true);
        }


    };

    const handleAddClick = () => {
        setOpenModal(true);
    };


    const handleInputChange = async (e) => {
        const {name, value} = e.target;
        if (name === 'category') {
            setNewItemCategory(value);
            if (message === "New Item?! Click the dropdown below and choose a category where your item belongs.") {
                setMessage('');
            }
        } else {
            setNewItem(prevState => ({
                ...prevState,
                [name]: value
            }));
            setMessage('');
            if (value === '') {
                setMessage('');
            } else {
                setMessage('');
                if (name === 'item_name' || name === 'name') {
                    await checkItemExists(value);
                }
            }
        }
    };


    const checkItemExists = async (itemName) => {
        try {
            const response = await axios.get(`http://localhost:8080/inventory/isinventoryexists?inventoryName=${itemName}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            setMessage("Item already exists. Do you wanna proceed to update it instead?");
            console.log("Item already exists. Do you wanna proceed to update it instead?");

        } catch (error) {

                setMessage("New Item?! Click the dropdown below and choose a category where your item belongs.");
                console.log("New Item?! Click the dropdown below and choose a category where your item belongs.");
                // setMessage("An unexpected error occurred.");

        }
    };

    useEffect(() => {
        const itemName = newItemCategory !== 1 ? newItem.item_name : newItem.name;
        if (itemName) {
            checkItemExists(itemName);
        }
    }, [newItem.item_name, newItem.name]);


    // const handleInputChangeCategory = (e) => {
    //     const { name, value } = e.target;
    //     if(name == "category"){
    //         setNewItemCategory(value);
    //     }
    //
    // };

    // const handleInputChange = (e) => {
    //     const { name, value} = e.target;
    //     setError('');
    //
    //     if(newItemCategory != 1){
    //         setNewItem(prevState => ({
    //             ...prevState,
    //             [name]: value
    //         }));
    //     }else{
    //         setNewConsumable(prevState => ({
    //             ...prevState,
    //             [name]: value
    //         }));
    //     }
    // }

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
            axios.post("http://localhost:8080/inventory/addinventory", {
                unit: newItem.unit,
                name: newItem.item_name,
                description: newItem.description,
                item_category:{
                    category_id:newItemCategory
                },
                quantity: newItem.quantity
            }, {
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
                    setError("Item already exists. To add stock please click the item from the list.");
                })
                .catch(error => {
                    if(error.response.status == 409){
                        axios.post("http://localhost:8080/inventory/addinventory", {
                            unit: newItem.unit,
                            name: newItem.item_name,
                            description: newItem.description,
                            item_category:{
                                category_id:newItemCategory
                            },
                            quantity: newItem.quantity
                        },{
                            headers:{
                                "Authorization": `Bearer ${jwtToken}`
                            }
                        })
                            .then(response => {
                                newInvId.current = response.data.inventory_id;
                                axios.post(`http://localhost:8080/item/insertitem?bulkSize=${newItem.quantity}`, {
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



    // const handleAddItem = () => {
    //     let newItemData;
    //     if (newItemCategory == 1) {
    //         newItemData = newConsumable;
    //     } else if (newItemCategory == 2) {
    //         newItemData = newEquipment;
    //     } else if (newItemCategory == 3) {
    //         newItemData = newGlassware;
    //     } else if (newItemCategory == 4) {
    //         newItemData = newHazards;
    //     }
    //
    //     axios.post("http://localhost:8080/inventory/addinventory", newItemData, {
    //         headers: {
    //             "Authorization": `Bearer ${jwtToken}`
    //         }
    //     })
    //         .then(response => {
    //             setOpenModal(false);
    //             setCurrentStep(1);
    //             fetchData(currentCategory);
    //             setOpenSnackbar(true);
    //             setSnackbarText("Item added");
    //         })
    //         .catch(error => {
    //             if (error.response.status === 401) {
    //                 setError("Unauthorized: Please log in again.");
    //             } else if (error.response.status === 409) {
    //                 setError("Item already exists. Did you mean add stock?");
    //             } else {
    //                 setError("An unexpected error occurred.");
    //             }
    //         });
    // };

    const handleSave = () => {
        console.log(editData)
        if(editData.item_category.category_id == 1){
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
                        console.log("Error when updating inventory for consumables");
                        setError("An unexpected error occurred. Please check the details and try again.");
                    }
                })
        }else{
            const bulkSize = editData.quantity - editDataOldQty;
            axios.put(`http://localhost:8080/inventory/updateinventory?id=${editData.inventory_id}`, editData, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                axios.put(`http://localhost:8080/item/updateitems?itemToEdit=${editDataName}`, {
                    item_name: editData.name
                }, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`
                    }
                })
                .then(resposne => {
                    if(bulkSize > 0){
                        axios.post(`http://localhost:8080/item/insertitem?bulkSize=${bulkSize}`, {
                            item_name: editData.name,
                            inventory: {
                                inventory_id: editData.inventory_id
                            }
                        },{
                            headers:{
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
                            if(error.response.status == 400){
                                setError(error.response.data);
                            }else if(error.response.status == 409){
                                setError(error.response.data);
                            }
                            console.log("Error when adding items");
                            setError("An unexpected error occurred. Please check the details and try again.");
                        })
                    }else if(bulkSize < 0){
                        axios.delete(`http://localhost:8080/item/deleteitems?bulkSize=${Math.abs(bulkSize)}`, {
                            data: { // Important learnings: since delete requests usually should not have bodies so by default it doesn't check the body, that is why we put it in our Request config the data
                                item_name: editData.name
                            },
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
                            if(error.response.status == 400){
                                setError(error.response.data);
                            }else if(error.response.status == 404){
                                setError(error.response.data);
                            }
                            console.log("Error when deleting items", editData.name);
                            setError("An unexpected error occurred. Please check the details and try again.");
                        })
                    }else{
                        setSnackbarText("Item successfully updated");
                        setOpenSnackbar(true);
                        setOpenModalEdit(false);
                        fetchData(currentCategory);
                    }
                })
                .catch(error => {
                    if(error.response.status == 400){
                        setError(error.response.data);
                    }else if(error.response.status == 404){
                        setError(error.response.data);
                    }
                    console.log("Error when updating items for non consumabeles");
                    setError("An unexpected error occurred. Please check the details and try again.");
                })
                // setSnackbarText("Item successfully updated");
                // setOpenSnackbar(true);
                // setOpenModalEdit(false);
                // fetchData(currentCategory);
            })
            .catch(error => {
                if(error.response.status == 409){
                    setError(error.response.data);
                }else{
                    console.log("Error when updating inventory for non consumabeles");
                    setError("An unexpected error occurred. Please check the details and try again.");
                }
            })
        }
    }

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
            <Appbar page={"inventory"} />
            <div className="inventory-container">
                <Sidebar page={"inventory"} />
                <div className="inventory-content">
                    {/*<br />*/}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MyPaper>
                            {!showTable && (
                                <div className={transition ? 'fade-slide-up' : ''} style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Consumables</h1>
                                        <img src={"/consumable.gif"} style={{width: '200px', height: '200px'}}
                                             onClick={() => handleViewListClick(0)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>Items that are consumed and need to be replenished.</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(0)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                    <h1>Equipments</h1>
                                        <img src={"/equipment.gif"} style={{ width: '200px', height: '200px' }}
                                             onClick={() => handleViewListClick(1)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>Instruments and equipment utilized for particular functions.</h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(1)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Glasswares</h1>
                                        <img src={"/glassware.gif"} style={{ width: '200px', height: '200px' }} onClick={() => handleViewListClick(2)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>
                                                Glass containers used for scientific experiments.
                                            </h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(2)}>View List</Button>
                                    </MyPaper>
                                    <MyPaper width="30%" height="30%">
                                        <h1>Hazards</h1>
                                        <img src={"/hazardous.gif"} style={{ width: '200px', height: '200px' }}
                                             onClick={() => handleViewListClick(3)}/>
                                        <MyPaper width={"100%"} height={"30%"}>
                                            <h4>
                                                Items that are hazardous and need to be handled with care.
                                            </h4>
                                        </MyPaper>
                                        <Button onClick={() => handleViewListClick(3)}>View List</Button>
                                    </MyPaper>
                                </div>
                            )}
                            <br />
                            {!showTable && (
                                <div className={transition ? 'fade-slide-up' : ''} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <MyPaper width={"95%"} height={"8%"}>
                                        {roleid != 1 ? (
                                            <Button onClick={() => handleViewAllItemsClick(4)}>View All Items</Button>
                                        ) : (
                                            <Button
                                                onClick={() => navigate('/inventoryST')}
                                                sx={{
                                                    backgroundColor: 'green',
                                                    color: 'yellow',
                                                    "&:hover": {
                                                        backgroundColor: '#9ACD32', // Yellow-green color for hover
                                                    },
                                                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                                }}
                                            >
                                                CLICK ME TO BORROW
                                            </Button>
                                        )}
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
                                        <div style={{ position: 'absolute', top: 8, right: 8 }}>
                                            <Button onClick={handleBack}><img src={"/exit.gif"} style={{
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
                                        rowsPerPageOptions={[5, 10, 15]}
                                        onAddClick={handleAddClick}
                                        roleid={roleid}
                                    />
                                </>
                            )}
                        </MyPaper>
                        <Modal open={openModal} onClose={handleModalClose}>



                            {/*dili pani final, will try to figure out saons ni maporma ang add feature*/}
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
                                <div style={{position: 'absolute', top: 24, right: 8}}>
                                    <Button onClick={handleModalClose}><img src={"/exit.gif"} style={{
                                        width: '30px',
                                        height: '30px',

                                    }}/></Button>
                                </div>
                                <Typography variant="h6" component="div"
                                            sx={{fontWeight: 'bold', color: '#016565', textAlign: 'center'}}>
                                    ADD ITEM
                                </Typography>
                                <TextField
                                    name="item_name"
                                    value={newItem.item_name}
                                    onChange={handleInputChange}
                                    sx={{backgroundColor: '#FFFFFF', borderRadius: '10px'}}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    required={true}
                                    autoComplete={'off'}
                                />
                                {message &&
                                    <Typography color="primary" sx={{mt: 0.5, fontSize: '14px'}}>{message}</Typography>}

                                <FormControl required>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        name="category"
                                        labelId="demo-simple-select-label"
                                        label="Category"
                                        value={newItemCategory}
                                        onChange={handleInputChange}
                                        variant='outlined'
                                    >
                                        <MenuItem value={0}>SELECT CATEGORY</MenuItem>
                                        <MenuItem value={1}>Consumables</MenuItem>
                                        <MenuItem value={2}>Equipments</MenuItem>
                                        <MenuItem value={3}>Glasswares</MenuItem>
                                        <MenuItem value={4}>Hazards</MenuItem>
                                    </Select>

                                </FormControl>
                                <TextField
                                    name="quantity"
                                    value={newItem.quantity}
                                    onChange={handleInputChange}
                                    sx={{backgroundColor: '#FFFFFF', borderRadius: '10px'}}
                                    label="Quantity"
                                    variant="outlined"
                                    fullWidth
                                    required={true}
                                    autoComplete={'off'}
                                />
                                <TextField
                                    name="unit"
                                    value={newItem.unit}
                                    onChange={handleInputChange}
                                    sx={{backgroundColor: '#FFFFFF', borderRadius: '10px'}}
                                    label="Unit"
                                    variant="outlined"
                                    fullWidth
                                    required={true}
                                    autoComplete={'off'}
                                />
                                <TextField
                                    name="description"
                                    value={editData.description}
                                    onChange={handleInputChange}
                                    sx={{backgroundColor: '#FFFFFF', borderRadius: '10px'}}
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    required={true}
                                    autoComplete={'off'}
                                />
                                {/*<Button variant="outlined" sx={{color: '#800000', borderColor: '#800000'}}*/}
                                {/*        onClick={handleModalBack}>*/}
                                {/*    Back*/}
                                {/*</Button>*/}
                                {error && <Typography color="error" sx={{mt:2}}>{error}</Typography>}
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#800000',
                                        color: '#FFF',
                                        '&:hover': {backgroundColor: '#5c0000'}
                                    }}
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </Button>


                            </Box>
                            {/*    enddddddddddddddddddddddddddddd*/}
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
                                            required={true}
                                            autoComplete={'off'}
                                        />
                                        <TextField
                                            name="description"
                                            value={editData.description}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            required={true}
                                            autoComplete={'off'}
                                        />
                                        {/* Improve: Modify to only allow decimals as input */}
                                        <TextField
                                            name="quantity"
                                            value={editData.quantity}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Quantity"
                                            variant="outlined"
                                            fullWidth required={true}
                                            autoComplete={'off'}
                                        />
                                        <TextField
                                            name="unit"
                                            value={editData.unit}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Unit"
                                            variant="outlined"
                                            fullWidth required={true}
                                            autoComplete={'off'}
                                        />
                                        <TextField
                                            name="status"
                                            value={editData.status}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Status"
                                            variant="outlined"
                                            fullWidth required={true}
                                            autoComplete={'off'}
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
                                            required={true}
                                            autoComplete={'off'}
                                        />
                                        <TextField
                                            name="description"
                                            value={editData.description}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            required={true}
                                            autoComplete={'off'}
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
                                            required={true}
                                            autoComplete={'off'}
                                        />
                                        <TextField
                                            name="unit"
                                            value={editData.unit}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Unit"
                                            variant="outlined"
                                            fullWidth required={true}
                                            autoComplete={'off'}
                                        />
                                        <TextField
                                            name="status"
                                            value={editData.status}
                                            onChange={handleInputChangeEdit}
                                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                            label="Status"
                                            variant="outlined"
                                            fullWidth required={true}
                                            autoComplete={'off'}
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