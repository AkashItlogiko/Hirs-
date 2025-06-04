
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components /Login';

import Mainlayout from './Dashboard/Mainlayout';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Mainlayout />} />
    </Routes>

   </BrowserRouter>
 
  );
}

export default App;
