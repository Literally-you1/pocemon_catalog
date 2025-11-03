import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { pockemonApi } from "../api/pokemonApi";
import { itemSlice } from "../slices/urlSlice";
import { FilterItems } from "../slices/filterArr";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [pockemonApi.reducerPath],
};

const rootreduser = combineReducers({
  [pockemonApi.reducerPath]: pockemonApi.reducer,
  item: itemSlice.reducer,
  FilterItems: FilterItems.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootreduser);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pockemonApi.middleware),
});
export const persistor = persistStore(store);
