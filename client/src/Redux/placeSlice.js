import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    totalPages: null,
    sortBy: "asc",
    filterByCountry: [],
    searchTitle: [],
};

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setFilterByCountry: (state, action) => {
            state.filterByCountry = action.payload;
        },
        setSearchTitle: (state, action) => {
            state.searchTitle = action.payload;
        },
    },
});

export const {
    setCurrentPage,
    setTotalPages,
    setSortBy,
    setFilterByCountry,
    setSearchTitle,
} = placeSlice.actions;

export default placeSlice.reducer;