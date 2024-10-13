import { configureStore } from '@reduxjs/toolkit'
import placeReducer from './placeSlice'
import userReducer from './userSlice'
import bookReducer from './bookingSlice'

export const store = configureStore({
    reducer: {
        places: placeReducer,
        user : userReducer,
        booking : bookReducer
    }
})