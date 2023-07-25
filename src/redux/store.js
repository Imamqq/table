import { configureStore } from '@reduxjs/toolkit'
import api from './ApiSlice'

export const store = configureStore({
    reducer: {
        api,
    },
})