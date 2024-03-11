import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: null
}

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUserDetails } = userDetailsSlice.actions

export default userDetailsSlice.reducer
