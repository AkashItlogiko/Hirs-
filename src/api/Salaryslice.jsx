import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSalary = createApi({
  reducerPath: 'apiSalary',  
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',  
  }),
  endpoints: (builder) => ({
    list: builder.query({
     providesTags: ['salary'], 
      query: ({ params, token }) => ({
        method: 'get',
        params: params,
        url: 'salary/list',  
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }),
    }),
    storeSalary: builder.mutation({
      invalidatesTags: ['salary'],  
      query: ({ data, token }) => ({
        url: 'salary/create',  
        method: 'post',
        body: { ...data },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
      }),
    }),
    updateSalary: builder.mutation({
      invalidatesTags: ['salary'],  
      query: ({ id, data, token }) => ({
        url: `salary/${id}/update`,  
        method: 'put',
        body: { ...data },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
      }),
    }),
    showSalary:builder.query({
      query: ({ id, token }) => ({
        url: `salary/${id}/show`,  
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
      }),
      providesTags: ['salary'],
    }),
    
    countSalary: builder.query({
      query: ({ token }) => ({
        url: 'total-salary',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['salary'],  
    }),

  }),
  tagTypes: ['salary'],
});

export default apiSalary;
