import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user
const initialState = {
    id: null,
    username: null,
    email: null,
    password: null,
    profilePicture: null,
    role: null,
};

// Check if the user is already logged in when the app reloads
const savedUser = localStorage.getItem('user');
const persistedState = savedUser ? JSON.parse(savedUser) : initialState;

const userSlice = createSlice({
    name: "user",
    initialState: persistedState, // Use persisted state if it exists
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.profilePicture = action.payload.profilePicture;
            state.role = action.payload.role;

            // Save user data in localStorage on login
            localStorage.setItem('user', JSON.stringify(state));
        },
        logOut: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.password = null;
            state.profilePicture = null;
            state.role = null;

            // Clear user data from localStorage on logout
            localStorage.removeItem('user');
        },
        updateUser: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.profilePicture = action.payload.profilePicture;

            // Update user data in localStorage
            localStorage.setItem('user', JSON.stringify(state));
        },
    },
});

export const { setUser, logOut, updateUser } = userSlice.actions;
export default userSlice.reducer;
