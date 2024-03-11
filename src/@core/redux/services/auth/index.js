import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_HOST } from 'src/@core/constants'

const timeout = 60000

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/api/v1/`,
    timeout: timeout
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ ...body }) => ({
        url: 'token/',
        method: 'POST',
        body: body,
        timeout: timeout
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response
    }),
    refresh: builder.mutation({
      query: ({ ...body }) => ({
        url: 'token/refresh/',
        method: 'POST',
        body: body,
        timeout: timeout
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response
    })
  })
})

export const { useLoginMutation, useRefreshMutation } = authApi
