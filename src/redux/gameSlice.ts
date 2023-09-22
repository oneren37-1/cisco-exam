import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWithRetry} from "../app/store";

export type GameDetails = {
    id: number;
    title: string;
    release_date: string;
    thumbnail: string;
    genre: string;
    publisher: string;
    developer: string;
    minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    }
    screenshots: {
        id: number;
        image: string;
    }[]
}

export interface GameState {
    content?: GameDetails;
    status: 'idle' | 'loading' | 'failed' | 'loaded';
    error: string | null;
}

const initialState: GameState = {
    status: 'idle',
    error: null
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGame.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchGame.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.content = action.payload
        })
        builder.addCase(fetchGame.rejected, (state, action) => {
            if (action.error.name === 'AbortError') return;
            state.status = 'failed'
            state.error = "Ошибка загрузки"
        })
    }
});

export const fetchGame = createAsyncThunk(
    'game/fetchGame',
    async (id: string, thunkAPI) => {
        // const url = new URL('https://free-to-play-games-database.p.rapidapi.com/api/game');
        const url = new URL('http://localhost:3000/game');

        url.searchParams.append('id', id);

        const options = {
            method: 'GET',
            signal: thunkAPI.signal,
        };

        return await fetchWithRetry(url, options)
            .then(response => response.json())
    }
)
export default gameSlice.reducer;