import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import gamesReducer from '../redux/gamesSlice';
import gameReducer from '../redux/gameSlice';
import cardsReducer from '../redux/cardSlice';

const persistConfig = {
    key: 'game',
    storage,
    timeout: 5 * 60 * 1000
};

const persistedGame = persistReducer(persistConfig, gameReducer);

export const store = configureStore({
  reducer: {
      game: persistedGame,
      games: gamesReducer,
      cards: cardsReducer
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export const persistor = persistStore(store);

export const fetchWithRetry = async (url: URL, options: any, retries = 3) : Promise<any> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        if (retries > 0) {
          return fetchWithRetry(url, options, retries - 1);
        }
        throw err;
    }
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
