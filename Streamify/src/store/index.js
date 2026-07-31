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

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];

    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });

    if (
      movie.poster_path &&
      !moviesArray.some((m) => m.id === movie.id)
    ) {
      moviesArray.push({
        id: movie.id,
        name: movie.original_name || movie.original_title,
        image: movie.poster_path,
        backdrop: movie.backdrop_path, 
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i <= 10; i++) {
        const { data } = await axios.get(
            `${api}${paging ? `&page=${i}` : ""}`
        );
        createArrayFromRawData(data.results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk(
    "streamify/trending",
    async ({ type, time }, thunkAPI) => {
        const {
            streamify: { genres },
        } = thunkAPI.getState();
        const data = await getRawData(
            `${TMDB_BASE_URL}/trending/${type}/${time}?api_key=${API_KEY}`,
            genres,
            true
        );    
        return data;
    }
);
// return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genre=${genre}`)

const StreamifySlice = createSlice({
    name: "Streamify",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        streamify: StreamifySlice.reducer,
    }
});