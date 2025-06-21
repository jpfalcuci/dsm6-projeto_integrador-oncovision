import { configureStore } from '@reduxjs/toolkit'
import predict from './reducer/predict'

export const store = configureStore({ reducer: predict })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
