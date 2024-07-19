import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from './Auth/authSlice';
import post from './posts/postSlice';
const rootPersistConfig={
  key:"root",
  storage,
  whitelist:["auth"]
}

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user","accessToken"],
};
const rootReducer = combineReducers({
  auth:persistReducer(authPersistConfig, auth),
post,
});

const persistedReducer= persistReducer(rootPersistConfig,rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


const persistor = persistStore(store);

export { store, persistor };