import { createSlice } from '@reduxjs/toolkit';
import { getAuth } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const firebaseSlice = createSlice({
    name:'firebase',
    initialState:{
        auth : getAuth(app)
    }
})
