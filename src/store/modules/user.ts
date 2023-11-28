import { createSlice } from '@reduxjs/toolkit'
import { removeToken } from '@/utils/auth'

const userName = localStorage.getItem('userName')

if (!userName) removeToken()

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: {
    name: userName
  },
  reducers: {
    nameChangeAction(state, { payload }) {
      state.name = payload
    }
  }
})

export const { nameChangeAction } = userInfoSlice.actions
export default userInfoSlice.reducer
