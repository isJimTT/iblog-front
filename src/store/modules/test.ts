import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
  name: 'testRedux',
  initialState: {
    age: 15,
    name: 'jim'
  },
  reducers: {
    testChangeAction(state, { payload }) {
      state.name = payload
    }
  }
})

export const { testChangeAction } = testSlice.actions
export default testSlice.reducer
