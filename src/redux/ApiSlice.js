import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            return response.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue
        }
    }
)


let initialState = {
    items: [],
    isLoading: true,
}

export const ApiSlice = createSlice({
    name: 'api',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            // console.log("loading")
            state.isLoading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
            state.items = payload
            // console.log("fulfilled")
            state.isLoading = false
        })
        builder.addCase(fetchPosts.rejected, () => {
            console.log("Rejected")
        })
    }
})

// export const { } = ApiSlice.actions
export const getPosts = (state) => state.api.items
export const isLoading = (state) => state.api.isLoading


export default ApiSlice.reducer
