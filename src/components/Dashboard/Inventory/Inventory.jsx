import Appbar from "../../Appbar/Appbar.jsx";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import MyPaper from "../../MyPaper.jsx";
import Sidebar from "../../Sidebar/Sidebar.jsx";
import './Inventory.css'; // Import the CSS file

export default function Inventory() {
    return (
        <>
            <Appbar page={"inventory"}/>
            <div className="inventory-container">
                <Sidebar page={"inventory"}/>
                <div className="inventory-content">
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <MyPaper>
                            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
                                <MyPaper width="30%" height="30%">
                                    <h1>Consumables</h1>
                                    <img src={"/consumable.gif"}
                                         style={{width: '200px', height: '200px'}}/>
                                    <MyPaper width={"100%"} height={"30%"}>
                                        <h4>This is a short description about consumables</h4>
                                    </MyPaper>
                                    <Button>View List</Button>
                                </MyPaper>
                                <MyPaper width="30%" height="30%">
                                    <h1>Equipment</h1>
                                    <img src={"/equipment.gif"}
                                         style={{width: '200px', height: '200px'}}/>
                                    <MyPaper width={"100%"} height={"30%"}>
                                        <h4>This is a short description about equipment</h4>
                                    </MyPaper>
                                    <Button>View List</Button>
                                </MyPaper>
                                <MyPaper width="30%" height="30%">
                                    <h1>Glassware</h1>
                                    <img src={"/glassware.gif"}
                                         style={{width: '200px', height: '200px'}}/>
                                    <MyPaper width={"100%"} height={"30%"}>
                                        <h4>This is a short description about glassware</h4>
                                    </MyPaper>
                                    <Button>View List</Button>
                                </MyPaper>
                            </div>
                            <br/>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <MyPaper width={"95%"} height={"8%"}>
                                    <Button>View All Items</Button>
                                </MyPaper>
                            </div>
                        </MyPaper>
                    </div>
                </div>
            </div>
        </>
    );
}