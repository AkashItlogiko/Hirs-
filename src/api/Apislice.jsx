import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        method: 'POST',
        body: data,
        url: '/login',
      }),
    }),
    logOut: builder.mutation({
      query: ({ token }) => ({
        method: 'POST',
        url: '/logout',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getEmployees: builder.query({
      query: () => '/employees',
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/employees/${id}`,
      }),
    }),
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        method: 'POST',
        url: '/employees',
        body: employeeData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation, // Export the new hook
} = apiAuth;
