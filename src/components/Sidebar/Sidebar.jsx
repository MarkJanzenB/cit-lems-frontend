import React, {useState} from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {getJWTSub, getJWTFullName, getJWTUid} from "../Authentication/jwt.jsx";

import './Sidebar.css';
import { Modal, Box, TextField, Typography, Button, Select, MenuItem } from '@mui/material';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import axios from 'axios';

export default function Sidebar({ page }) {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = parseInt(localStorage.getItem("userRole"));
    const currentUser = localStorage.getItem("User");
    const [openModal, setOpenModal] = useState(false);
    //for editing data of request
    const [getTeacher, setTeacher] = useState('');
    const [getRemarks, setRemarks] = useState(null);
    const [getRoom, setRoom] = useState(null);
    const [getDate, setDate] = useState(null);
    const [getStartHour, setStartHour] = useState('');
    const [getStartMinute, setStartMinute] = useState('');
    const [getEndHour, setEndHour] = useState('');
    const [getEndMinute, setEndMinute] = useState('');
    const [getYearSection, setYearSection] = useState('');
    const [getSubject, setSubject] = useState('');
    const [getApproval, setApproval] = useState('');
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const labels = {
        schedule: 'Schedule',
        inventory: 'Inventory',
        report: 'Report',
        borrowhistory: 'Borrow History'
    };

    const label = labels[page] || 'Return';
    const [teacherId, setTeacherId] = useState(0);
    const jwtToken = localStorage.getItem("jwtToken");
        const [teachers, setTeachers] = useState([{
        user_id: 0,
        fullname: '',
    }]);
    const [subjects, setSubjects] = useState([{}]);
    const [subjectId, setSubjectId] = useState(0);

    const handleCreateRequest = () => {
        axios.get("http://localhost:8080/user/getallusersbyroleid?roleId=1", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            const updatedTeachers = response.data.map(teacher => ({
                ...teacher,
                fullname: `${teacher.first_name} ${teacher.last_name}` // Concatenate with space
            }));

            setTeachers(updatedTeachers);
        })
        .catch(error => {
            console.log(error);
        })

        axios.get("http://localhost:8080/subject/getallsubject", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            setSubjects(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        if (userRole != 1) {
            setTeacher('');
            setApproval('Approved');
        }
        if (userRole === 1) {
            setTeacher(getJWTSub());
            setTeacherId(getJWTUid());
            setApproval('Pending');
        }
        setDate(null);
        setStartHour('');
        setStartMinute('');
        setEndHour('');
        setEndMinute('');
        setYearSection('');
        setSubject('');
        setRoom('');
        setOpenModal(true);
    };
    const handleSave = () => {
        setOpenConfirmModal(true);
    };

    const handleConfirmSave = () => {
        // const updatedRows = rows.map((row) =>
        //     row === selectedRow
        //         ? {
        //             ...row,
        //             teacher: getTeacher,
        //             date: getDate.toLocaleDateString(),
        //             time: `${getStartHour}:${getStartMinute < 10 ? `0${getStartMinute}` : getStartMinute} - ${getEndHour}:${getEndMinute < 10 ? `0${getEndMinute}` : getEndMinute}`,
        //             yearSection: getYearSection,
        //             subject: getSubject,
        //             room: getRoom,
        //             approval: getApproval,
        //         }
        //         : row
        // );

        const [minute, period] = getStartMinute.split(" ");
        const [endminute, endperiod] = getEndMinute.split(" ");

        let hour = parseInt(getStartHour, 10);
        let endhour = parseInt(getEndHour, 10);

        if (period === "AM") {
            if (hour === 12) {
                hour = 0; // Midnight case (12 AM = 00 in 24-hour format)
            }
        } else if (period === "PM") {
            if (hour !== 12) {
                hour += 12; // PM, add 12 to convert to 24-hour format (e.g., 1 PM = 13)
            }
        }

        if (endperiod === "AM") {
            if (endhour === 12) {
                endhour = 0; // Midnight case (12 AM = 00 in 24-hour format)
            }
        } else if (endperiod === "PM") {
            if (endhour !== 12) {
                endhour += 12; // PM, add 12 to convert to 24-hour format (e.g., 1 PM = 13)
            }
        }

        console.log(getApproval)

        const formattedHour = hour.toString().padStart(2, "0"); // Ensure two-digit hour
        const formattedMinute = minute.padStart(2, "0");

        const endformattedHour = endhour.toString().padStart(2, "0"); // Ensure two-digit hour
        const endformattedMinute = endminute.padStart(2, "0");

        const timeString = `${formattedHour}:${formattedMinute}:00`;
        const endtimeString = `${endformattedHour}:${endformattedMinute}:00`;

        const requestData = {
            teacher: {
                user_id: teacherId
            },
            date_schedule: getDate.toLocaleDateString("en-CA"),
            start_time: timeString,
            end_time: endtimeString,
            subject: {
                subject_id: subjectId
            },
            room: getRoom,
            status: getApproval
        };
        
        // Conditionally add date_approved
        if (userRole !== 1) {
            requestData.date_approved = getFormattedLocalDateTime();
            requestData.date_requested = getFormattedLocalDateTime();
            requestData.approver = { user_id: getJWTUid() };
        }else{
            requestData.date_requested = getFormattedLocalDateTime();
        }

         axios.post("http://localhost:8080/request/addrequest", requestData, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            console.log(response)
            setIncrementFlag(incrementFlag + 1);
        })
        .catch(error => {
            console.log(error)
        })
        //setRows(updatedRows);
        setOpenModal(false);
        setOpenConfirmModal(false);
        setOpenSuccessModal(true);
    };

    const handleRequest = () => {
        navigate('/schedule/request');
    };
    const handleToday = () => {
        navigate('/schedule/today');
    };
    const handleUpcomingSched = () => {
        navigate('/schedule/upcoming');
    };

    const handleExport = () => {
        navigate('/inventory/export');
    };
    const handleCategoryPage = () => {
        navigate('/inventory');
    };

    const handleDamages = () => {
        navigate('/report/damages');
    };
    const handleResolved = () => {
        navigate('/report/resolved');
    };
    const handleReturnItems = () => {
        navigate('/borrowhistory/returnitems');
    };
    const handleBorrowHistory = () => {
        navigate('/borrowhistory/list');
    };

    const handleBorrowList = () => {
        navigate('/borrowhistory/borrowlist');
    };

    const handleBorrowCart = () => {
        navigate('/borrowcart');
    };

    const isActive = (path) => location.pathname === path;

    const getFormattedLocalDateTime = () => {
        const now = new Date();
    
        // Get date and time components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading 0
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        // Combine them into the desired format
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    return (
        <aside className="sidebar-container">
            <h2 className="sidebar-title">
                <Link to={"/dashboard"}><Button><img src={"/ybb.gif"} alt="Logo" style={{
                    width: '25px',
                    height: '100%',
                    marginBottom: '3px',
                    marginLeft: '16px'
                }}/>
                    <h1 style={{color: "#F2EE9D", fontFamily: "Poppins"}}>{label.toUpperCase()}</h1>
                </Button></Link>
            </h2>
            <div className="sidebar-buttons">
                {page === 'schedule' && (
                    <>
                        <button className={`sidebar-button ${isActive('/schedule/request') ? 'active' : ''}`}
                                onClick={handleRequest} style={{display: 'block'}}>Requests
                        </button>
                        <button className={`sidebar-button ${isActive('/schedule/today') ? 'active' : ''}`}
                                onClick={handleToday} style={{display: 'block'}}>Today
                        </button>
                        <button className={`sidebar-button ${isActive('/schedule/upcoming') ? 'active' : ''}`}
                                onClick={handleUpcomingSched} style={{display: 'block'}}>Schedules
                        </button>


                        <div style={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '400px'
                            }
                        }>

                            {userRole != 1 && (
                                <button
                                    className={`sidebar-create-button`}
                                    onClick={handleCreateRequest}>Create Schedule
                                </button>
                            )}
                            {userRole === 1 && (
                                <button
                                    className={`sidebar-create-button`}
                                    onClick={handleCreateRequest}>Request Schedule
                                </button>
                            )}

                        </div>
                    </>
                )}
                {page === 'inventory' && (
                    <>
                        <button className={`sidebar-button ${isActive('/inventory') ? 'active' : ''}`}
                                onClick={handleCategoryPage} style={{display: 'block'}}>Categories
                        </button>
                        {userRole !== 1 && (
                            <button className={`sidebar-button ${isActive('/inventory/export') ? 'active' : ''}`}
                                    onClick={handleExport} style={{display: 'block'}}>Export Inventory
                            </button>
                        )}
                        {userRole === 1 && (
                            <button className={`sidebar-button ${isActive('/borrowcart') ? 'active' : ''}`}
                                    onClick={handleBorrowCart} style={{display: 'block'}}>Borrow Cart
                            </button>
                        )}
                    </>
                )}
                {page === 'report' && (
                    <>
                        <button className={`sidebar-button ${isActive('/report/damages') ? 'active' : ''}`}
                                onClick={handleDamages} style={{display: 'block'}}>Damages
                        </button>
                        <button className={`sidebar-button ${isActive('/report/resolved') ? 'active' : ''}`}
                                onClick={handleResolved} style={{display: 'block'}}>Resolved
                        </button>
                    </>
                )}

                {page === 'borrowhistory' && (
                    <>
                        <button className={`sidebar-button ${isActive('/borrowhistory/list') ? 'active' : ''}`}
                                onClick={handleBorrowHistory} style={{display: 'block'}}>Borrow Schedule
                        </button>
                        {userRole != 1 && (
                            <button className={`sidebar-button ${isActive('/borrowhistory/returnitems') ? 'active' : ''}`}
                                    onClick={handleReturnItems} style={{display: 'block'}}>Return Items
                            </button>
                        )}
                        {userRole === 1 && (
                            <button className={`sidebar-button ${isActive('/borrowhistory/borrowlist') ? 'active' : ''}`}
                                    onClick={handleBorrowList} style={{display: 'block'}}>Borrow List
                            </button>
                        )}
                    </>
                )}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 450,
                            bgcolor: '#FFFFFF',
                            borderRadius: '15px',
                            boxShadow: 24,
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#016565',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {userRole != 1 && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        padding: '15px',
                                    }}
                                >
                                    Create New Schedule
                                </Typography>
                            )}
                            {userRole === 1 && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        padding: '15px',
                                    }}
                                >
                                    Request a Schedule
                                </Typography>
                            )}

                            <Button
                                onClick={() => setOpenModal(false)}
                                sx={{
                                    color: '#FFFFFF',
                                    background: 'none',
                                    paddingLeft: '7px',
                                    minWidth: 'unset',
                                    '&:hover': {
                                        background: 'none',
                                    },
                                }}
                            >
                                ✕
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            {/* HERE */}
                        {userRole != 1 && (
                            <Select
                                onChange={(e) => setTeacher(e.target.value)}
                                fullWidth
                                displayEmpty
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                                value={getTeacher}
                            >
                                <MenuItem value="" disabled>
                                    Select a Teacher
                                </MenuItem>
                                {/*Should fetch fullname of all users that are teacher*/}
                                {/* <MenuItem value={getTeacher}>{getJWTFullName()}</MenuItem> */}
                                {teachers.map((teacher) => (
                                     <MenuItem key={teacher.user_id} value={teacher.fullname} onClick={() => setTeacherId(teacher.user_id)}>
                                        {teacher.fullname}
                                    </MenuItem>
                                ))}
                                </Select>
                        )}

                        {userRole === 1 && (
                            <TextField
                                label="Teacher"
                                value={getJWTFullName()}
                                fullWidth
                                // Should fetch fullname of curent user that is a teacher
                                disabled
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            />
                        )}



                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={getDate}
                                    onChange={(newValue) => setDate(newValue)}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#FFFFFF',
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Select
                                    value={getStartHour}
                                    onChange={(e) => setStartHour(e.target.value)}
                                    displayEmpty
                                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                >
                                    <MenuItem value="" disabled>00</MenuItem>
                                    {[...Array(12).keys()].map((hour) => (
                                        <MenuItem key={hour + 1} value={hour + 1}>{hour + 1}</MenuItem>
                                    ))}
                                </Select>
                                <Typography>:</Typography>
                                <Select
                                    value={getStartMinute}
                                    onChange={(e) => setStartMinute(e.target.value)}
                                    displayEmpty
                                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                >
                                    <MenuItem value="" disabled>00 PM</MenuItem>
                                    {["00 AM", "15 AM", "30 AM", "45 AM", "00 PM", "15 PM", "30 PM", "45 PM"].map((minute) => (
                                        <MenuItem key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</MenuItem>
                                    ))}
                                </Select>
                                <Typography>-</Typography>
                                <Select
                                    value={getEndHour}
                                    onChange={(e) => setEndHour(e.target.value)}
                                    displayEmpty
                                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                >
                                    <MenuItem value="" disabled>00</MenuItem>
                                    {[...Array(12).keys()].map((hour) => (
                                        <MenuItem key={hour + 1} value={hour + 1}>{hour + 1}</MenuItem>
                                    ))}
                                </Select>
                                <Typography>:</Typography>
                                <Select
                                    value={getEndMinute}
                                    onChange={(e) => setEndMinute(e.target.value)}
                                    displayEmpty
                                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#f0f0f0' } }}
                                >
                                    <MenuItem value="" disabled>00 PM</MenuItem>
                                    {["00 AM", "15 AM", "30 AM", "45 AM","00 PM","15 PM", "30 PM", "45 PM"].map((minute) => (
                                        <MenuItem key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Select
                                value={getYearSection}
                                onChange={(e) => setYearSection(e.target.value)}
                                fullWidth
                                displayEmpty
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select Year and Section
                                </MenuItem>
                                <MenuItem value="Year 1 - Section A">Year 1 - Section A</MenuItem>
                                <MenuItem value="Year 1 - Section B">Year 1 - Section B</MenuItem>
                                <MenuItem value="Year 2 - Section A">Year 2 - Section A</MenuItem>
                                <MenuItem value="Year 2 - Section B">Year 2 - Section B</MenuItem>
                            </Select>

                            <Select
                                value={getSubject}
                                aria-placeholder={"Subject"}
                                onChange={(e) => setSubject(e.target.value)}
                                fullWidth
                                displayEmpty
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select Subject
                                </MenuItem>
                                {/* <MenuItem value="Mathematics">Mathematics</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="History">History</MenuItem>
                                <MenuItem value="English">English</MenuItem> */}
                                {subjects.map((subject) => (
                                    <MenuItem key={subject.subject_id} value={subject.subject_name} onClick={() => setSubjectId(subject.subject_id)}>
                                        {subject.subject_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Select
                                value={getRoom}
                                onChange={(e) => setRoom(e.target.value)}
                                fullWidth
                                displayEmpty
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select Room
                                </MenuItem>
                                <MenuItem value="Laboratory 1">Laboratory 1</MenuItem>
                                <MenuItem value="Laboratory 2">Laboratory 2</MenuItem>
                                <MenuItem value="Classroom">Classroom</MenuItem>
                            </Select>
                        </Box>

                        <Box
                            sx={{
                                padding: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #e0e0e0',
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            <Button
                                onClick={() => setOpenModal(false)}
                                variant="outlined"
                                sx={{
                                    color: '#333',
                                    borderColor: '#333',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                variant="contained"
                                sx={{
                                    backgroundColor: 'maroon',
                                    color: '#FFFFFF',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: '#014d4d',
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'white',
                            borderRadius: '15px',
                            boxShadow: 24,
                            padding: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6">Are you sure you want to Submit?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                            <Button onClick={() => setOpenConfirmModal(false)}>No</Button>
                            <Button onClick={handleConfirmSave} variant="contained" color="primary">
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'white',
                            borderRadius: '15px',
                            boxShadow: 24,
                            padding: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'green' }}>
                            Save Successfully!
                        </Typography>
                        <Button
                            onClick={() => setOpenSuccessModal(false)}
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '20px' }}
                        >
                            OK
                        </Button>
                    </Box>
                </Modal>
            </div>
        </aside>



    );
}