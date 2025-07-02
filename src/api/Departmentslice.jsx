import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiDepartment = createApi({
  reducerPath: 'apiDepartment',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
  }),
  tagTypes: ['department'],
  endpoints: (builder) => ({
    list: builder.query({
      providesTags: ['department'],
      query: ({ params, token }) => ({
        method: 'get',
        params: params,
        url: 'departments/list',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    
    create: builder.mutation({
      invalidatesTags: ['department'],
      query: ({ data, token }) => ({
        url: 'departments/create',
        method: 'post',
        body: { ...data },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    update: builder.mutation({
      invalidatesTags: ['department'],
      query: ({ id, data, token }) => ({
        url: `departments/${id}/update`,
        method: 'put',
        body: { ...data },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    show: builder.query({
      providesTags: ['department'],
      query: ({ id, token }) => ({
        url: `departments/${id}/show`,
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteDepartment: builder.mutation({
      invalidatesTags: ['department'],
      query: ({ id, token }) => ({
        url: `departments/${id}/delete`,
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default apiDepartment;
