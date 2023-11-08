import { configureStore } from '@reduxjs/toolkit'
import userReduxReducer from './modules/user'

const store = configureStore({
  reducer: {
    userRedux: userReduxReducer
  }
})

export default store
