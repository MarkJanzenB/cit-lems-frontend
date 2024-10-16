import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import StyledPaper from "./MyPaper";
import logo3 from "../assets/static/img/cit-logo.png";
import lems from "../assets/static/img/lems.png";
import TextField from '@mui/material/TextField';
import axios from "axios";


const register = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8080/user/register", credentials);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
};
const firebaseConfig = {
    apiKey: "AIzaSyDZGXMjVVHmEo3V-29wRXvkdXLZ5SjqFzs",
    authDomain: "lems-3bbc3.firebaseapp.com",
    projectId: "lems-3bbc3",
    storageBucket: "lems-3bbc3.appspot.com",
    messagingSenderId: "896933531342",
    appId: "1:896933531342:web:c1223997c4f7126cbfca9f",
    measurementId: "G-WZ8QQBDX7V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export default function Register() {
    const [formData, setFormData] = useState({
        idNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [credentials, setCredentials] = useState({
        fname: '',
        lname: '',
        password: '',
        idnum: '',
        email: '',
        acctype: 'lol'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!formData.email.endsWith('@cit.edu')) {
    //         setError('Email must end with @cit.edu');
    //         return;
    //     }
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    //         const user = userCredential.user;
    //         await addDoc(collection(db, "users"), {
    //             idNumber: formData.idNumber,
    //             firstName: formData.firstName,
    //             lastName: formData.lastName,
    //             email: formData.email,
    //             password: formData.password, // Add password to Firestore
    //             uid: user.uid
    //         });
    //         console.log('Form submitted:', formData);
    //         setError('');
    //         setSuccess('User successfully created');
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //         setError('Error submitting form');
    //         setSuccess('');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.email.endsWith('@cit.edu')) {
            setError('Email must end with @cit.edu');
            return;
        }
        try {
            await register(credentials);
            console.log('Form submitted:', credentials);
            setError('');
            setSuccess('User successfully created');
        } catch (e) {
            console.error("Error submitting form: ", e);
            setError('Error submitting form');
            setSuccess('');
        }
    };

    function testing(){
        console.log(credentials);
    }

    return (
        <>
            <div className="headerrr">
                <img className="inline-element" src={logo3} alt="Cebu Institute of Technology University Logo"/>
                <img className="inline-element logo" src={lems} alt="LEMS Logo"/>
            </div>
            <hr/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <StyledPaper width="600px" height="650px">
                    <form onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <div className="form-group">
                            <TextField
                                label="ID Number"
                                type="text"
                                name="idnum"
                                value={credentials.idnum}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                label="First Name"
                                type="text"
                                name="fname"
                                value={credentials.fname}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div className="form-group">

                            <TextField
                                label="Last Name"
                                type="text"
                                name="lname"
                                value={credentials.lname}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div className="form-group">

                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        {success && <p style={{color: 'green'}}>{success}</p>}
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <br/>
                        <button type="submit" className="center-button">Register</button>
                    </form>
                </StyledPaper>
            </div>
        </>
    );
}