import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: {
    name: null
  },
  reducers: {
    nameChangeAction(state, { payload }) {
      state.name = payload
    }
  }
})

export const { nameChangeAction } = userInfoSlice.actions
export default userInfoSlice.reducer
