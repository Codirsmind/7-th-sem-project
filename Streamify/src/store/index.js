import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../Utils/constants";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
    
};

export const getGenres = createAsyncThunk(
  "streamify/genres",
  async () => {
      const { data } = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      return data.genres;
  }
);


const StreamifySlice = createSlice({
    name: "Streamify",
    initialState,
    extraReducers: (builder)=> {
        builder.addCase(getGenres.fulfilled, (state, action)=>{
            state.genres = action.payload;
            state.genresLoaded = true;
        });
    },
});

export const store = configureStore({
    reducer: {
        streamify: StreamifySlice.reducer,
    }
});