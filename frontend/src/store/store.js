import { configureStore } from '@reduxjs/toolkit'
import studentDataReducer from './studentData.js'

export const store = configureStore({
    reducer: {
        studentData: studentDataReducer,
    },
})