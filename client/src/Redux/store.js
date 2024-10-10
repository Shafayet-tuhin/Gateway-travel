import { configureStore } from '@reduxjs/toolkit'
import placeReducer from './placeSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        places: placeReducer,
        user : userReducer
    }
})