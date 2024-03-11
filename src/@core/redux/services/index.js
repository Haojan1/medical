import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_HOST } from 'src/@core/constants'
import toast, { Toaster } from 'react-hot-toast'
import { updateUserDetails } from 'src/@core/redux/slices/userDetails'

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_HOST}/api/v1/`,
  credentials: 'same-origin',
  prepareHeaders: async (headers, { getState }) => {
    const loggedInUser = getState().userDetails
    headers.set('Authorization', `Bearer ${loggedInUser.userDetails.access}`)
    headers.set('Content-Type', 'application/json')
    return headers
  }
})

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  const refreshToken = api.getState().userDetails.refresh
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: 'refresh/',
        method: 'POST',
        body: { refresh: refreshToken }
      },
      api,
      extraOptions
    )
    if (refreshResult?.data) {
      console.log(refreshResult)

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
    }
  }

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithRefreshToken,
  endpoints: builder => ({})
})
