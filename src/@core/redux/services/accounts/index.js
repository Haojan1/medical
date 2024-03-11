import { api } from 'src/@core/redux/services'

const timeout = 60000

export const accountsApi = api.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation({
      query: ({ ...body }) => ({
        url: 'accounts/change-password/',
        method: 'PUT',
        body: body,
        timeout: timeout
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response
    })
  }),
  overrideExisting: true
})

export const { useChangePasswordMutation } = accountsApi
