 
import Login from './components /Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from './components /layout/Mainlayout';
import AllEmployees from './Dashboard/AllEmployees';
import Dashboard from './Dashboard/Dashboard';
import Attendance from './Dashboard/Attendance';
import Absence from './Dashboard/Absence';
import Salary from './Dashboard/Salary';
import Logo from './Dashboard/Logo';

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
    path:"/absence",
    element:<Absence/>
  },
  {
    path:"/salary",
    element:<Salary/>,
  },
  {
    path:"/home",
    element:<Logo/>
  }
    
    ]
  },
  
]);
  return <RouterProvider router={router} />;
};

export default App;
