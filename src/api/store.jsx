import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from './Apislice';
import apiEmployee from './Employeeslice';
import apiAttendance from './Attendanceslice';
import apiSalary from './Salaryslice';
 
const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,  
    [apiEmployee.reducerPath]: apiEmployee.reducer,
    [apiAttendance.reducerPath]:apiAttendance.reducer,
    [apiSalary.reducerPath]:apiSalary.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiAuth.middleware,apiEmployee.middleware,apiAttendance.middleware,apiSalary.middleware]), 
});

export default store;
