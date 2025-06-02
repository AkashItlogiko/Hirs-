import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiAuth=createApi({
     reducerPath:'apiAuth',
      baseQuery:fetchBaseQuery({
            baseUrl:'http://127.0.0.1:8001',     
      }),
       endpoints:(builder)=>({
              login: builder.mutation({
                query: (data) => ({
                 mathod: 'POST',
                  body : data,
                  url :'/login',
                }),

              }),    
            }) 
   
});

 