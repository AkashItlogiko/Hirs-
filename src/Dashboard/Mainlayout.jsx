import { useState } from "react";
import "../App.css";
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from "./Dashboard";

const Mainlayout = () => {
    const[openSidebarToggle, setOpenSidebarToggle] = useState(false);
      const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    return (
        <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Dashboard/>
        </div>
    );
};

export default Mainlayout;