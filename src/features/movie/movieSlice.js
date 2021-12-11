import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovie } = movieSlice.actions;

export const selectMovies = (state) => state.movie.movies;

// export { selectMovies };

export default movieSlice.reducer;
