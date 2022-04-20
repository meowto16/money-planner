import {combineReducers, createStore} from "@reduxjs/toolkit";

import { moneyReducer, MoneyState } from "./money.slice";

export type StoreState = {
    money: MoneyState
}

const reducer = combineReducers({
    money: moneyReducer,
})

const store = createStore(reducer)

export default store