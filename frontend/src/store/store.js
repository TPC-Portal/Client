import { configureStore } from '@reduxjs/toolkit'
import studentDataReducer from './slices/studentDataSlice.js'

export const store = configureStore({
    reducer: {
        studentData: studentDataReducer,
    },
})