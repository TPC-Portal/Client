import { configureStore } from '@reduxjs/toolkit'
import studentDataReducer from './slices/studentDataSlice.js'
import authReducer from './slices/authSlice.js'

export const store = configureStore({
    reducer: {
        studentData: studentDataReducer,
        auth: authReducer,
    },
})