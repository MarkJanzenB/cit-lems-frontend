import Appbar from "../../Appbar/Appbar.jsx";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar.jsx"

export default function BorrowHistory() {
    return (
        <>
            <Appbar page={"borrowhistory"} />
            <Sidebar page={"borrowhistory"}/>
        </>
    );
}
