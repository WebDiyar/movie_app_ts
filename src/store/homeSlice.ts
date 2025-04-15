import { createSlice } from "@reduxjs/toolkit";
interface UrlState {
  backdrop: string;
  poster: string;
  profile: string;
}
interface Genre {
  id: number;
  name: string;
}

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    url: {} as UrlState,
    genres: {} as Genre[],
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;
export default homeSlice.reducer;
