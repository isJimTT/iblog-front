import store from '@/store'
import React from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

type IRootState = ReturnType<typeof store.getState>
const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

export default useAppSelector
