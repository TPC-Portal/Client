import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [], // Start with an empty array, as it's likely what you want
}

export const studentDataSlice = createSlice({
    name: 'studentData',
    initialState,
    reducers: {
        addStudentData(state, action) {
            state.data = action.payload; // Replace old data with new data
            // console.log(state.data[0]);
        },

        appendStudentData(state, action) {
            state.data.push(...action.payload); // Append new data
        },
    },
})

export const { addStudentData, appendStudentData } = studentDataSlice.actions

export default studentDataSlice.reducer
