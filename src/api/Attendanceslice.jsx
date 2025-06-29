import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiAttendance = createApi({
  reducerPath: 'apiAttendance', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',  
  }),
  endpoints: (builder) => ({
    list: builder.query({
      providesTags: ['attendance'],
      query: ({ params, token }) => ({
        method: 'get',
        params: params,
        url: 'attendance/list',  
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }),
    }),
    storeAttendance: builder.mutation({
      invalidatesTags: ['attendance'],  
      query: ({ data, token }) => ({
        url: 'attendance/create',  
        method: 'post',
        body: { ...data },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
      }),
    }),
    updateAttendance:builder.mutation({
      invalidatesTags:['attendance'],
      query:({id,data,token})=>({
        url:`attendance/${id}/update`,  
        method:'put',
        body:{...data},
        headers:{
          'Accept':'application/json',
          Authorization:`Bearer ${token}`,  
        },
      })
    }),
    showAttendance: builder.query({
      query: ({ id, token }) => ({
        url: `attendance/${id}/show`,
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['attendance'],
    }),
    deleteAttendance: builder.mutation({
      invalidatesTags: ['attendance'],
      query: ({ id, token }) => ({
        url: `attendance/${id}/delete`,
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }), 

        employeeAttendance:builder.query({
      query:({params,token})=>({
        url:'employee/attendance',
        mathod:'get',
        params:{...params},
        headers:{
           'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }),
        providesTags: ['attendance'],
    }),

    countAttendance: builder.query({
      query: ({ token, status }) => ({
        url: 'attendance/total',
        method: 'get',
        params: { status },
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['attendance'],
    }),
  }),
  tagTypes: ['attendance'],
});

export default apiAttendance;
