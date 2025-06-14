import { IoMdLogOut } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoHandRightSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
 
import 
{ BsGrid1X2Fill}
 from 'react-icons/bs'
import { Link } from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>  
                <Link to={"/"}>
                <MdAdminPanelSettings  className='icon_header'/> HRIS
                </Link>            
                
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to={"/employees"}>
                    
                    <MdGroups2 className='icon'/> All Employees
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <IoHandRightSharp className='icon'/> Attendance
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <IoMdLogOut className='icon'/> Absence
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <FaMoneyCheckDollar  className='icon'/> Salary
                </Link>
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar