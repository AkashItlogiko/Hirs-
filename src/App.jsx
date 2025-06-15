 
import Login from './components /Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from './components /layout/Mainlayout';
import AllEmployees from './Dashboard/AllEmployees';
import Dashboard from './Dashboard/Dashboard';
import Attendance from './Dashboard/Attendance';
import Salary from './Dashboard/Salary';
import Logo from './Dashboard/Logo';
import EmployeeCreateForm from './Dashboard/EmployeeCreateForm';
import AttendanceCreateForm from './Dashboard/AttendanceCreateForm';
import Events from './Dashboard/Events';
import EventsCreateForm from './Dashboard/EventsCreateForm';
import SalaryCreateForm from './Dashboard/SalaryCreateForm';

function App() {

const router=createBrowserRouter([
  {
    path:"/",
    element: <Mainlayout/>,
    children:[
     {
     path:"/dashboard",
     element:<Dashboard/>,
     },
    {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/employees",
    element: <AllEmployees/> 
  },
  {
    path:"/attendance",
    element:<Attendance/>,
  },
  {
    path:"/salary",
    element:<Salary/>,
  },
  {
   path:"/salaryform",
   element:<SalaryCreateForm/>
  },
  {
    path:"/home",
    element:<Logo/>
  },
  {
    path:"/employeeform",
    element:<EmployeeCreateForm/>
  },
  {
    path:"/attendanceform",
    element:<AttendanceCreateForm/>
  },
  {
    path:"/events",
    element:<Events/>
  },
  {
    path:"/eventsform",
    element:<EventsCreateForm/>
  }
    
    ]
  },
  
]);
  return <RouterProvider router={router} />;
};

export default App;
