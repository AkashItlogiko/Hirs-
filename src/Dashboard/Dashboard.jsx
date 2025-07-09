import { MdGroups2 } from "react-icons/md";
import { IoHandRightSharp } from "react-icons/io5";
// import { IoMdLogOut } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import apiEmployee from "../api/Employeeslice";
import apiSalary from "../api/Salaryslice";
import apiAttendance from "../api/Attendanceslice";

const Dashboard = () => {

  const token1 = localStorage.getItem("token");

  const { data: countEmployee } = apiEmployee.useCountEmployeeQuery({ token: token1 }); 

  const { data: countSalary } = apiSalary.useCountSalaryQuery({ token: token1 });

  const { data: countAttendancePresent } = apiAttendance.useCountAttendanceQuery({ token: token1, status: 'Present' });

  const { data: countAttendanceAbsent } = apiAttendance.useCountAttendanceQuery({ token: token1, status: 'Absent' });

  return ( 
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
        <div className="card" style={{ flex: "1 1 calc(50% - 16px)", maxWidth: "calc(50% - 16px)" }}>
          <div className="card-inner">
            <h3>All Employees</h3>
            <MdGroups2 className="card_icon" />
          </div>
          <h1>{countEmployee?.data}</h1>
        </div>
        <div className="card" style={{ flex: "1 1 calc(50% - 16px)", maxWidth: "calc(50% - 16px)" }}>
          <div className="card-inner">
            <h3>Attendance</h3>
            <IoHandRightSharp className="card_icon" />
          </div>
          <h1>Present({countAttendancePresent?.data}) | Absent({countAttendanceAbsent?.data})</h1>
        </div>
        <div className="card" style={{ flex: "1 1 calc(50% - 16px)", maxWidth: "calc(50% - 16px)" }}>
          <div className="card-inner">
            <h3>Total Salary</h3>
            <FaMoneyCheckDollar className="card_icon" />
          </div>
          <h1>{countSalary?.data}$</h1>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
