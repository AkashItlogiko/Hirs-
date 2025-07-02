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
        url: 'department/list',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    
    create: builder.mutation({
      invalidatesTags: ['department'],
      query: ({ data, token }) => ({
        url: 'department/create',
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
        url: `department/${id}/update`,
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
        url: `department/${id}/show`,
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
        url: `department/${id}/delete`,
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
