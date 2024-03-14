import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = []

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        return response.data
    }
    catch(err){
        return err.message
    }
})

export default usersSlice.reducer

export const selectUserById = (state, userId) => {
    return state.users.find(user => user.id === userId)
}