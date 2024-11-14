import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appbar from "../../Appbar/Appbar";
import Sidebar from "../../Sidebar/Sidebar.jsx";


export default function Report() {
    return (
        <>
            <Appbar page={"reports"} />
            <br/><br/><br/><br/>
            <Link to={"/dashboard"}><Button><img src={"/orangeybackbutton.gif"} style={{ width: '50px', height: '50px' }} /></Button></Link>
        </>
    );

}