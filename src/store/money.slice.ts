import { createSlice, createSelector, PayloadAction, nanoid } from '@reduxjs/toolkit'
import {StoreState} from "./store";

export type Money = number

export type CostsItemId = ReturnType<typeof nanoid>
export type CostsItem = {
    id: CostsItemId
    name: string
    amount: Money
}

export type CostsItemPayload = Omit<CostsItem, 'id'>

export interface MoneyState {
    total: Money | null
    costs: CostsItem[]
}

const initialState = {
    total: null,
    costs: [],
} as MoneyState

const money = createSlice({
    name: 'money',
    initialState,
    reducers: {
        resetToInitialState: () => {
            return {
                ...initialState
            }
        },
        setTotal: (state, action: PayloadAction<Money>) => {
            state.total = action.payload
        },
        resetTotal: (state) => {
            state.total = null
        },
        addCostsItem: (state) => {
            state.costs.push({
                id: nanoid(),
                name: '',
                amount: 0
            } as CostsItem)
        },
        removeCostsItem: (state, action: PayloadAction<CostsItemId>) => {
            state.costs = state.costs.filter(cost => cost.id !== action.payload)
        },
        changeCostsItem: (state, action: PayloadAction<Partial<CostsItemPayload> & { id: CostsItemId }>) => {
            const item = state.costs.find(cost => cost.id === action.payload.id)
            if (!item) return

            if (typeof action.payload.name === 'string') {
                item.name = action.payload.name
            }

            if (typeof action.payload.amount === 'number') {
                item.amount = action.payload.amount
            }
        },
        sortItems: (state, action: PayloadAction<'byName' | 'byAmount'>) => {
            const type = action.payload

            const byAmount = (a: CostsItem, b: CostsItem) => a.amount - b.amount
            const byName = (a: CostsItem, b: CostsItem) => a.name.localeCompare(b.name)

            switch (type) {
                case "byAmount":
                    state.costs = state.costs.sort((a, b) => byAmount(a, b) || byName(a, b))
                    break
                case "byName":
                    state.costs = state.costs.sort((a, b) => byName(a, b) || byAmount(a, b))
                    break
            }
        },
    },
})

const getRoot = createSelector((state: StoreState) => state.money, root => root)
const getTotalMoney = createSelector(getRoot, root => root.total)
const getCosts = createSelector(getRoot, root => root.costs)
const getCostsSum = createSelector(getCosts, costs => costs.reduce((acc, cost) => acc += cost.amount, 0))
const getTotalMoneyCalculated = createSelector(getTotalMoney, getCostsSum, (total, costsSum) => (total || 0) - costsSum)

export default money

const moneyReducer = money.reducer
const moneyActions = money.actions
const moneySelectors = {
    getRoot,
    getTotalMoney,
    getCosts,
    getCostsSum,
    getTotalMoneyCalculated,
}

export {
    moneyReducer,
    moneyActions,
    moneySelectors
}