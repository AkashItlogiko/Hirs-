
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components /Login';

import Mainlayout from './Dashboard/Mainlayout';
import AllEmployees from './Dashboard/AllEmployees';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Mainlayout />} />
      <Route path="/employees" element={<AllEmployees/>}/>   
    </Routes>

   </BrowserRouter>
 
  );
}

export default App;
