import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

export const studentDataSlice = createSlice({
    name: 'studentData',
    initialState,
    reducers: {
        addStudentData(state, action) {
            state.data = action.payload.data;
            console.log(state.data[0])
        },

        appendStudentData(state, action) {
            state.data.push(...action.payload);
        },
    },
})

export const { addStudentData, appendStudentData } = studentDataSlice.actions

export default studentDataSlice.reducer
