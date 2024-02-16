import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "homeSlice",
    initialState: {
        url: {},
        genres: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;
export default homeSlice.reducer;