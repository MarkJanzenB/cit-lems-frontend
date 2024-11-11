import Appbar from "../../Appbar/Appbar.jsx";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar.jsx"

export default function BorrowHistory() {
    return (
        <>
            <Appbar page={"borrow-history"} />
            <Sidebar page={"borrow-history"}/>
            {/*<br/><br/><br/><br/>*/}
            {/*<Link to={"/dashboard"}><Button><img src={"/orangeybackbutton.gif"} style={{ width: '50px', height: '50px' }} /></Button></Link>*/}
        </>
    );
}
