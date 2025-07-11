import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from './components /layout/Mainlayout';
import AllEmployees from './Dashboard/AllEmployees';
import Dashboard from './Dashboard/Dashboard';
import Attendance from './Dashboard/Attendance';
import Salary from './Dashboard/Salary';
import EmployeeCreateForm from './Dashboard/EmployeeCreateForm';
import AttendanceCreateForm from './Dashboard/AttendanceCreateForm';
import SalaryCreateForm from './Dashboard/SalaryCreateForm';
import Login from "./components /Auth/Login";
import ProtectedRoute from "./components /Auth/ProtectedRoute";
import NotFound from "./components /Auth/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeUpdateForm from "./Dashboard/EmployeesUpdateForm";
import AttendanceUpdateForm from "./Dashboard/AttendanceUpdateForm";
import SalaryUpdateForm from "./Dashboard/SalaryUpdateForm";
import Attendancereport from "./Dashboard/Attendancereport";
import Department from "./Dashboard/Department";
import DepartmentCreateForm from "./Dashboard/DepartmentCreateForm";
import DepartmentUpdateForm from "./Dashboard/DepartmentUpdateForm";

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>, // Login route is now independent
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Mainlayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/employees",
          element: <AllEmployees />
        },
        {
          path: "/attendance",
          element: <Attendance />,
        },
        {
          path: "/salary",
          element: <Salary />,
        },
        {
          path: "/salaryform",
          element: <SalaryCreateForm />
        },
     
        {
          path: "/employeeform",
          element: <EmployeeCreateForm />
        },
        {
          path: "/department",
          element: <Department />
        },
        {
          path:"/departmentform",
          element:<DepartmentCreateForm/>
        },
        {
          path:"/departmentupdateform/:id",
          element:<DepartmentUpdateForm/>
        },
        {
          path: "/attendanceform",
          element: <AttendanceCreateForm />
        },
        {
          path: "/employeeupdateform/:id",
          element: <EmployeeUpdateForm />
        },
        {
          path:"attendanceupdateform/:id",
          element: <AttendanceUpdateForm />
        },
        {
          path:"attendancereport/:id",
          element:<Attendancereport/>

        },
        {
          path:"salaryupdateform/:id",
          element: <SalaryUpdateForm />
        }        
      ]
    },
    {
    path: "*", // Fallback route
    element: <NotFound />,
  },
  ]);

  return (
    <>
     <RouterProvider router={router} />
     <ToastContainer position="top-right" autoClose={3000} />
    </>
   
    
  ) 

}

export default App;
