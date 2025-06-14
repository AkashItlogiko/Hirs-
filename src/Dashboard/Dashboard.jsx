import { MdGroups2 } from "react-icons/md";
import { IoHandRightSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";

function Dashboard() {
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
          <h1>300</h1>
        </div>
        <div className="card" style={{ flex: "1 1 calc(50% - 16px)", maxWidth: "calc(50% - 16px)" }}>
          <div className="card-inner">
            <h3>Attendance</h3>
            <IoHandRightSharp className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card" style={{ flex: "1 1 calc(50% - 16px)", maxWidth: "calc(50% - 16px)" }}>
          <div className="card-inner">
            <h3>Absence</h3>
            <IoMdLogOut className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card" style={{ flex: "1 1 calc(50% - 16px)", maxWidth: "calc(50% - 16px)" }}>
          <div className="card-inner">
            <h3>Salary</h3>
            <FaMoneyCheckDollar className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
