import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiEmployee = createApi({
  reducerPath: 'apiEmployee',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
  }),
  endpoints: (builder) => ({
    list: builder.query({
      providesTags: ['employee'], // Helps with cache management and invalidation 
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
    updateEmployee: builder.mutation({
  invalidatesTags: ['employee'],  
  query: ({ id, data, token }) => ({
    url: `employee/${id}/update`,
    method: 'put',
    body: { ...data },
    headers: {
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
  }),
  showEmployee: builder.query({
  query: ({ id, token }) => ({
    url: `employee/${id}/show`,
    method: 'get',
    headers: {
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
  providesTags: ['employee'],  
}),
    deleteEmployee: builder.mutation({
      invalidatesTags: ['employee'],  
      query: ({ id, token }) => ({
        url: `employee/${id}/delete`,
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    countEmployee: builder.query({
      query: ({ token }) => ({
        url: 'all-employees',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['employee'],  
    }),

  }),
  tagTypes: ['employee'],
});

export default apiEmployee;
