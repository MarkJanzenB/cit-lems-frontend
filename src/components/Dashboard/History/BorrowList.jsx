import React, { useState } from "react";
import Appbar from "../../Appbar/Appbar.jsx";
import Sidebar from "../../Sidebar/Sidebar.jsx";
import {
    Button, Box, Grid, Card, CardContent, CardMedia, Typography, Snackbar, IconButton, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, ToggleButton, ToggleButtonGroup,
    ThemeProvider, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: { main: "#016565" },
        secondary: { main: "#f2ee9d" },
    },
});

export default function BorrowList() {
    const navigate = useNavigate();
    const sampleBorrowList = [
        {
            id: 1,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Microscope",
            quantity: 2,
            instructor: "Dr. Smith",
            section: "Biology 101",
            date: "2024-12-01",
            status: "Pending for Approval",
        },
        {
            id: 2,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Beaker Set",
            quantity: 3,
            instructor: "Mr. Brown",
            section: "Chemistry 202",
            date: "2024-12-02",
            status: "Approved",
        },
        {
            id: 3,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Calculator",
            quantity: 1,
            instructor: "Ms. Johnson",
            section: "Math 303",
            date: "2024-12-03",
            status: "Pending for Approval",
        },
        {
            id: 4,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Tripod",
            quantity: 1,
            instructor: "Dr. Cooper",
            section: "Physics 404",
            date: "2024-12-04",
            status: "Approved",
        },
        {
            id: 5,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Stethoscope",
            quantity: 4,
            instructor: "Dr. Miller",
            section: "Nursing 505",
            date: "2024-12-05",
            status: "Pending for Approval",
        },
        {
            id: 6,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Multimeter",
            quantity: 2,
            instructor: "Mr. Clark",
            section: "Engineering 606",
            date: "2024-12-06",
            status: "Approved",
        },
        {
            id: 7,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Tablet",
            quantity: 1,
            instructor: "Ms. Davis",
            section: "Art 707",
            date: "2024-12-07",
            status: "Pending for Approval",
        },
        {
            id: 8,
            itemPhoto: "https://via.placeholder.com/140",
            itemName: "Lab Coat",
            quantity: 5,
            instructor: "Dr. Taylor",
            section: "Lab Safety 808",
            date: "2024-12-08",
            status: "Pending for Approval",
        },
    ];

    const [borrowList, setBorrowList] = useState(sampleBorrowList);
    const [view, setView] = useState("grid");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openReturnConfirmation, setOpenReturnConfirmation] = useState(false);
    const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleItemClick = (item) => {
        if (item.status === "Pending for Approval") {
            setSelectedItem({ ...item, date: new Date().toISOString().split('T')[0] });
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    const handleUpdateItem = () => {
        if (selectedItem) {
            const updatedList = borrowList.map((item) =>
                item.id === selectedItem.id ? selectedItem : item
            );
            setBorrowList(updatedList);
            setSnackbarText(`Item ${selectedItem.itemName} updated successfully.`);
            setOpenSnackbar(true);
        }
        setOpenModal(false);
        setSelectedItem(null);
    };

    const handleReturnItem = (item) => {
        setSelectedItem(item);
        setOpenReturnConfirmation(true);
    };

    const handleConfirmReturn = () => {
        if (selectedItem) {
            const updatedList = borrowList.map((item) =>
                item.id === selectedItem.id ? { ...item, status: "Returned" } : item
            );
            setBorrowList(updatedList);
            setSnackbarText(`Item ${selectedItem.itemName} returned successfully.`);
            setOpenSnackbar(true);
        }
        setOpenReturnConfirmation(false);
        setSelectedItem(null);
    };

    const handleCancelReturn = () => {
        setOpenReturnConfirmation(false);
        setSelectedItem(null);
    };

    const handleCancelBorrow = (item) => {
        setSelectedItem(item);
        setOpenCancelConfirmation(true);
    };

    const handleConfirmCancel = () => {
        if (selectedItem) {
            const updatedList = borrowList.filter((item) => item.id !== selectedItem.id);
            setBorrowList(updatedList);
            setSnackbarText(`Borrow request for ${selectedItem.itemName} canceled.`);
            setOpenSnackbar(true);
        }
        setOpenCancelConfirmation(false);
        setSelectedItem(null);
    };

    const handleCancelCancel = () => {
        setOpenCancelConfirmation(false);
        setSelectedItem(null);
    };

    const handleViewChange = (event, newView) => {
        if (newView) setView(newView);
    };

    return (
        <ThemeProvider theme={theme}>
            <Appbar page={"borrow-list"} />
            <div className="inventory-container">
                <Sidebar page={"borrowhistory"} />
                <div className="inventory-content">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#016565",
                                color: "#f2ee9d",
                                "&:hover": { backgroundColor: "#014d4d" },
                            }}
                            onClick={() => navigate("/inventoryST")}
                        >
                            Borrow More
                        </Button>
                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="View Toggle"
                        >
                            <ToggleButton value="grid" aria-label="Grid View">
                                <ViewModuleIcon />
                            </ToggleButton>
                            <ToggleButton value="table" aria-label="Table View">
                                <ViewListIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {view === "grid" ? (
                        <Box sx={{ height: "70vh", overflow: "auto" }}>
                            <Grid container spacing={3}>
                                {borrowList.map((item) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
                                        <Card
                                            sx={{
                                                maxWidth: 300,
                                                minHeight: 400,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                cursor: item.status === "Pending for Approval" ? "pointer" : "default",
                                            }}
                                            onClick={() => handleItemClick(item)}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={item.itemPhoto}
                                                alt={item.itemName}
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="div"
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {item.itemName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Quantity:</strong> {item.quantity}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Instructor:</strong> {item.instructor}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Section:</strong> {item.section}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Date:</strong> {item.date}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mt: 1,
                                                        fontWeight: "bold",
                                                        color: "#ad4f1c",
                                                    }}
                                                >
                                                    <strong>Status:</strong> {item.status}
                                                </Typography>
                                            </CardContent>
                                            <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                                                {item.status === "Approved" ? (
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={item.status === "Returned"}
                                                        onClick={() => handleReturnItem(item)}
                                                    >
                                                        Return Item
                                                    </Button>
                                                ) : item.status === "Pending for Approval" ? (
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleCancelBorrow(item)}
                                                    >
                                                        Cancel Borrow
                                                    </Button>
                                                ) : null}
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Instructor</TableCell>
                                        <TableCell>Section</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {borrowList.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            onClick={() => handleItemClick(item)}
                                            sx={{
                                                cursor: item.status === "Pending for Approval" ? "pointer" : "default",
                                            }}
                                        >
                                            <TableCell>{item.itemName}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.instructor}</TableCell>
                                            <TableCell>{item.section}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <TableCell>
                                                {item.status === "Approved" ? (
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={item.status === "Returned"}
                                                        onClick={() => handleReturnItem(item)}
                                                    >
                                                        Return Item
                                                    </Button>
                                                ) : item.status === "Pending for Approval" ? (
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleCancelBorrow(item)}
                                                    >
                                                        Cancel Borrow
                                                    </Button>
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* Modal for Editing Item */}
                    <Dialog open={openModal} onClose={handleCloseModal}>
                        <DialogTitle>Edit Item</DialogTitle>
                        <DialogContent>
                            {selectedItem && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Typography variant="body1">Photo (view only)</Typography>
                                    <img src={selectedItem.itemPhoto} alt={selectedItem.itemName} style={{ width: "100%", marginBottom: 16 }} />

                                    <TextField
                                        label="Item Name"
                                        value={selectedItem.itemName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        label="Quantity"
                                        type="number"
                                        value={selectedItem.quantity}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        label="Instructor"
                                        value={selectedItem.instructor}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        label="Section"
                                        value={selectedItem.section}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        label="Date"
                                        value={selectedItem.date}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateItem} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Confirmation Modal for Cancel Borrow */}
                    <Dialog open={openCancelConfirmation} onClose={handleCancelCancel}>
                        <DialogTitle>Cancel Borrow Request</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to cancel the borrow request for {selectedItem?.itemName}?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelCancel} color="primary">
                                No
                            </Button>
                            <Button onClick={handleConfirmCancel} color="primary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Confirmation Modal for Return Item */}
                    <Dialog open={openReturnConfirmation} onClose={handleCancelReturn}>
                        <DialogTitle>Return Item</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to return the item {selectedItem?.itemName}?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelReturn} color="primary">
                                No
                            </Button>
                            <Button onClick={handleConfirmReturn} color="primary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarText}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </ThemeProvider>
    );
}