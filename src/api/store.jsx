import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from './Apislice';
import apiEmployee from './Employeeslice';
import apiAttendance from './Attendanceslice';
import apiSalary from './Salaryslice';
import apiDepartment from './Departmentslice';
 
const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,  
    [apiEmployee.reducerPath]: apiEmployee.reducer,
    [apiAttendance.reducerPath]:apiAttendance.reducer,
    [apiSalary.reducerPath]:apiSalary.reducer,
    [apiDepartment.reducerPath]:apiDepartment.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiAuth.middleware,apiEmployee.middleware,apiAttendance.middleware,apiSalary.middleware,apiDepartment.middleware]), 
});

export default store;
