import React from "react";
import MyPaper from "../MyPaper.jsx";

export default function EditProfile(){
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <MyPaper width="50%" height="80%">
                <br/>
                <h1>Basic Information</h1>
            </MyPaper>
        </div>
    );
}