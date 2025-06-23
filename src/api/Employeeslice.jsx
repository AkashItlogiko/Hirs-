import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiEmployee = createApi({
  reducerPath: 'apiEmployee',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
  }),
  endpoints: (builder) => ({
    list: builder.query({
       
      query: ({ params, token }) => ({
        url: 'employee/list',
        method: 'get',
        params: params,
        headers: {
          // 'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    storeEmployee: builder.mutation({
      invalidatesTags: ['employee'],  
      query: ({ data, token }) => ({
        url: 'employee/create',
        method: 'post',
        body: { ...data },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
           
        },
      }),
    }),
  }),
  tagTypes: ['employee'],
});

export default apiEmployee;
