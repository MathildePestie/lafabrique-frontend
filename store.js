import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./reducers/user";
import cart from "./reducers/cart";
import palette from "./reducers/palette";

const persistConfig = {
  key: "lafabrique",
  storage,
};

const rootReducer = combineReducers({
  user: user,
  cart: cart,
  palette: palette
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
  

export const persistor = persistStore(store);
