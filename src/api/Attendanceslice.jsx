import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiAttendance = createApi({
  reducerPath: 'apiAttendance', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',  
  }),
  endpoints: (builder) => ({
    list: builder.query({
      query: ({ params, token }) => ({
        method: 'get',
        params: params,
        url: 'attendance/list',  
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }),
    }),
  }),
});

export default apiAttendance;
