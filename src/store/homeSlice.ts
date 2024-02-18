import { createSlice } from "@reduxjs/toolkit";
interface UrlState {
    backdrop: string;
    poster: string;
    profile: string;
}

export const homeSlice = createSlice({
    name: "homeSlice",
    initialState: {
        url: {} as UrlState, 
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
