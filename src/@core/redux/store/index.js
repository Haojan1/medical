import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from 'src/@core/redux/services'
import { authApi } from 'src/@core/redux/services/auth'
import userDetailsReducer from '../slices/userDetails'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    userDetails: userDetailsReducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat([api.middleware, authApi.middleware])
})

setupListeners(store.dispatch)
