import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { API_KEY } from "../../common/apis/movieApiKey";

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

// thunk : middleware we can create middleware for sync action creator into Async action.
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {

    const response = await movieApi.get(
      `?apiKey=${API_KEY}&s=${term}&type=movie`
    );
    return response.data;
  }
);

// thunk : middleware we can create middleware for sync action creator into Async action.
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
   
    const response = await movieApi.get(
      `?apiKey=${API_KEY}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${API_KEY}&i=${id}&Plot=full`);
    console.log("first : : ", response.data);
    return response.data;
  }
);


const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeMovieOrShow :(state)=>{
      state.selectedMovieOrShow = {};
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Succesfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },    
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Succesfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Succesfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeMovieOrShow } = moviesSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default moviesSlice.reducer;
