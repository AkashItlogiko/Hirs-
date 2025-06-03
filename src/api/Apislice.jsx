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
  }),
});

export const { useLoginMutation } = apiAuth;
