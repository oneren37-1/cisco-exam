import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWithRetry, RootState} from "../app/store";

export type Game = {
    id: number,
    title: string,
    thumbnail: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    release_date: string,
}
export interface GamesState {
    games: Game[],
    gamesCount: number,
    page: number,
    pageSize: number,
    sortType: "relevance" | "alphabetical" | "release-date" | "popularity",
    platformType: "all" | "pc" | "browser",
    categories: string[],

    status: 'idle' | 'loading' | 'failed',
    error: string | null,
}

const initialState: GamesState = {
    games: [],
    gamesCount: 0,
    page: 1,
    pageSize: 10,
    sortType: 'relevance',
    platformType: 'all',
    categories: [],

    status: 'idle',
    error: null,
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload
        },
        setSortType: (state, action) => {
            state.sortType = action.payload
        },
        setPlatformType: (state, action) => {
            state.platformType = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            state.status = 'idle'
            state.gamesCount = action.payload.gamesCount
            state.games = action.payload.games
        })
        builder.addCase(fetchGames.rejected, (state, action) => {
            if (action.error.message === 'Not Found') {
                state.status = 'idle';
                state.gamesCount = 0;
                state.games = [];
                return;
            }
            if (action.error.name === 'AbortError') return;
            state.status = 'failed'
            state.error = "Ошибка загрузки"
        })
    }
});

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (_, thunkAPI) => {
        const url = new URL('http://localhost:3000/games');

        const state: RootState = thunkAPI.getState() as RootState;
        url.searchParams.append('page', state.games.page.toString());
        url.searchParams.append('size', state.games.pageSize.toString());
        url.searchParams.append('sort', state.games.sortType);
        url.searchParams.append('platform', state.games.platformType);
        state.games.categories.length && url.searchParams.append('category', state.games.categories.join('.'));

        const options = {
            method: 'GET',
            signal: thunkAPI.signal,
        };

        return await fetchWithRetry(url, options)
            .then(response => response.json())
    }
)

export const {
    setPage,
    setPageSize,
    setSortType,
    setPlatformType,
    setCategories
} = gamesSlice.actions;

export default gamesSlice.reducer;