import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    value: {},
    favourites: []
}

const movieSlice = createSlice({
    name: "movies",
    initialState: initialState,
    reducers: {
        searchMovies(state, action) {
            state.value = {
                ...state.value,
                ...action.payload
            }
        },
        addToFavourites(state, action) {
            state.value = {
                ...state.value,
            },
            state.favourites = [
                ...state.favourites,
                ...action.payload
            ]
        },
        removeFromFavourites(state, action) {
            state.favourites = [
                ...action.payload
            ]
        }
    }
})

const store = configureStore({reducer: movieSlice.reducer})


export const movieActions = movieSlice.actions;

export default store;