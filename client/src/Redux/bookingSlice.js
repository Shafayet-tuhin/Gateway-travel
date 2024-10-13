import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentBooking: JSON.parse(localStorage.getItem('bookingData')) || [], // Load from localStorage or use empty array
  };
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.currentBooking.push(action.payload);
    },
    
    clearBookings: (state) => {
      state.currentBooking = [];
    },
  },
});

export const { addBooking, clearBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
