import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { moneyReducer, MoneyState } from './money.slice'

export type StoreState = {
    money: MoneyState
}

const rootReducer = combineReducers({
  money: moneyReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
})
export const persistor = persistStore(store)