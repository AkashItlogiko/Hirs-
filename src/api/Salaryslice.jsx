import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSalary = createApi({
  reducerPath: 'apiSalary',  
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',  
  }),
  endpoints: (builder) => ({
    list: builder.query({
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
  }),
  tagTypes: ['salary'],
});

export default apiSalary;
