import { IoMdLogOut } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoHandRightSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import 
{ BsGrid1X2Fill}
 from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { apiAuth } from "../api/Apislice";
import { toast } from "react-toastify";

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate = useNavigate();
    const [logOut] = apiAuth.useLogOutMutation();
    

    const handleLogout = async () => {
      const token = localStorage.getItem('token');  
      if (!token) {
        toast.error("No token found. Please log in first.");
        return;
      }
  
      try {
        const response = await logOut({ token }).unwrap();
        console.log('Logout successful:', response);
        toast.success("Logout successful!");
    
        localStorage.removeItem('token');
       setTimeout(() => navigate("/login"), 500);  
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
  
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>  
                <Link to={"/dashboard"}>
                <MdAdminPanelSettings  className='icon_header'/> HRIS
                </Link>            
                
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to={"/dashboard"}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to={"/employees"}>
                    
                    <MdGroups2 className='icon'/> All Employees
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/attendance">
                    <IoHandRightSharp className='icon'/> Attendance
                </Link>
            </li>
             <li className='sidebar-list-item'>
                <Link to="/salary">
                    <FaMoneyCheckDollar  className='icon'/> Salary
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link onClick={handleLogout}>
                    <IoMdLogOut className='icon'/> LogOut
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar