import { configureStore } from '@reduxjs/toolkit'
import testReduxReducer from './modules/test'

const store = configureStore({
  reducer: {
    testRedux: testReduxReducer
  }
})

export default store
