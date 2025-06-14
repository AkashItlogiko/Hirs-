import { useState } from "react";
import "../../App.css";

import Header from '../../Dashboard/Header';
import Sidebar from '../../Dashboard/Sidebar';
 
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
    const[openSidebarToggle, setOpenSidebarToggle] = useState(false);
      const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    return (
        <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Outlet/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        
        </div>
    );
};

export default Mainlayout;