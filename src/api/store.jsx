import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from './Apislice';
 

const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware), 
});

export default store;
