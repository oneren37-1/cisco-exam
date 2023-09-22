import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWithRetry, RootState} from "../app/store";

export type Card = {
    id: number,
    question: string,
    variants: string[],
    correct: string[],
    explanation: string,
    url: string,
    score: string
}
export interface CardsState {
    cards: Card[],

    status: 'idle' | 'loading' | 'failed' | 'ok',
    error: string | null,
}

const initialState: CardsState = {
    cards: [],

    status: 'idle',
    error: null,
}

export const cardsSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCards.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.status = 'ok'
            state.cards = action.payload
        })
        builder.addCase(fetchCards.rejected, (state, action) => {
            state.status = 'failed'
            state.error = "Ошибка загрузки"
        })
        builder.addCase(inc.fulfilled, (state, action) => {
            state.cards = [...state.cards.map((card) => {
                if (card.id === action.payload) {
                    card.score = (+card.score + 1).toString();
                }
                return card
            })]
        })
        builder.addCase(dec.fulfilled, (state, action) => {
            state.cards = [...state.cards.map((card) => {
                if (card.id === action.payload) {
                    card.score = (+card.score - 3).toString();
                }
                return card
            })]
        })
    }
});

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async (_, thunkAPI) => {
        const url = new URL('http://localhost:3004/q');

        const options = {
            method: 'GET',
        };

        return await fetch(url, options)
            .then(response => response.json())
    }
)

export const inc = createAsyncThunk(
    'cards/inc',
    async (data: any) => {
        const { id, score } = data;
        const url = new URL(`http://localhost:3004/q/${id}`);

        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ score: score + 1 })
        };

        return await fetch(url, options)
            .then(response => response.json())
    }
)

export const dec = createAsyncThunk(
    'cards/dec',
    async (data: any) => {
        const { id, score } = data;
        const url = new URL(`http://localhost:3004/q/${id}`);

        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ score: score - 3 })
        };

        return await fetch(url, options)
            .then(response => response.json())
    }
)


export default cardsSlice.reducer;