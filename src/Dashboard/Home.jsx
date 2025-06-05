 import { MdGroups2 } from "react-icons/md";
 import { IoHandRightSharp } from "react-icons/io5";
 import { IoMdLogOut } from "react-icons/io";
 import { FaMoneyCheckDollar } from "react-icons/fa6";
function Home() {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>All Employees</h3>
                    <MdGroups2  className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Attendance</h3>
                    <IoHandRightSharp className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Absence</h3>
                    <IoMdLogOut className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Salary</h3>
                    <FaMoneyCheckDollar className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>

        
    </main>
  )
}

export default Home