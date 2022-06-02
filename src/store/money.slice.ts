import { createSlice, createSelector, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { StoreState } from './store'

export const DEFAULT_CATEGORY_ID = 'DEFAULT_CATEGORY'

export enum EAppMoneyMode {
  SALARY_MODE = 'SALARY_MODE',
  BUDGET_MODE = 'BUDGET_MODE'
}

export type Money = number

export type CategoryId = ReturnType<typeof nanoid>
export type CategoryItem = {
  id: CategoryId
  name: string
}

export type CategoryItemPayload = Omit<CategoryItem, 'id'>

export type CostsItemId = ReturnType<typeof nanoid>
export type CostsItem = {
    id: CostsItemId
    name: string
    amount: Money
    categoryId: CategoryId | null
}

export type CostsItemPayload = Omit<CostsItem, 'id'>

export interface MoneyState {
    total: Money | null
    costs: CostsItem[]
    sortedBy: 'BY_NAME_ASC' | 'BY_NAME_DESC' | 'BY_AMOUNT_ASC' | 'BY_AMOUNT_DESC' | null
    categories: Record<CategoryId, CategoryItem>
}

const initialState = {
  total: null,
  costs: [],
  sortedBy: null,
  categories: {},
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
    addDefaultCategoryToCost: (state, action: PayloadAction<CostsItemId>) => {
      if (!state.categories) {
        state.categories = {}
      }

      if (!state.categories[DEFAULT_CATEGORY_ID]) {
        state.categories[DEFAULT_CATEGORY_ID] = {
          id: DEFAULT_CATEGORY_ID,
          name: 'Стандартная категория',
        }
      }

      const cost = state.costs.find(cost => cost.id === action.payload)

      if (!cost) {
        return state
      }

      cost.categoryId = DEFAULT_CATEGORY_ID
    },
    removeCategoriesFromAllCosts: (state) => {
      return {
        ...state,
        costs: state.costs.map((cost) => ({
          ...cost,
          categoryId: null
        }))
      }
    },
    createCategory: (state, action: PayloadAction<CategoryItemPayload>) => {
      const categoriesCount = Object.keys(state.categories || {}).length
      const categoryId = nanoid()

      if (!state.categories) {
        state.categories = {}
      }

      state.categories[categoryId] = {
        id: nanoid(),
        name: action.payload.name || `Категория №${categoriesCount + 1}`,
      }
    },
    removeCategory: (state, action: PayloadAction<CategoryId>) => {
      delete state.categories[action.payload]
    },
    addCostsItem: (state) => {
      state.costs.push({
        id: nanoid(),
        name: '',
        amount: 0,
        categoryId: null,
      } as CostsItem)
    },
    removeCostsItem: (state, action: PayloadAction<CostsItemId>) => {
      state.costs = state.costs.filter(cost => cost.id !== action.payload)

      if (state.costs.length === 0) {
        state.sortedBy = null
      }
    },
    changeCostsItem: (state, action: PayloadAction<Partial<CostsItemPayload> & { id: CostsItemId }>) => {
      const item = state.costs.find(cost => cost.id === action.payload.id)
      if (!item) return state

      if (typeof action.payload.name === 'string') {
        item.name = action.payload.name
      }

      if (typeof action.payload.amount === 'number') {
        item.amount = action.payload.amount
      }

      if (typeof action.payload.categoryId === 'string' || action.payload.categoryId === null) {
        item.categoryId = action.payload.categoryId
      }
    },
    linkCostsItemToCategory: (state, action: PayloadAction<{ costsItemId: CostsItemId; categoryId: CategoryId }>) => {
      const category = state.categories[action.payload.categoryId]
      const costsItem = state.costs.find((cost) => cost.id === action.payload.costsItemId)

      if (!category || !costsItem) {
        return state
      }

      costsItem.categoryId = action.payload.categoryId
    },
    sortItems: (state, action: PayloadAction<'byName' | 'byAmount'>) => {
      const type = action.payload
      const currentSort = state.sortedBy

      const byAmount = (a: CostsItem, b: CostsItem) => a.amount - b.amount
      const byName = (a: CostsItem, b: CostsItem) => a.name.localeCompare(b.name)

      switch (type) {
      case 'byAmount': {
        const sort = currentSort === 'BY_AMOUNT_ASC' ? 'BY_AMOUNT_DESC' : 'BY_AMOUNT_ASC'
        state.costs = state.costs.sort((a, b) => {
          const [first, second] = sort === 'BY_AMOUNT_ASC'
            ? [a, b]
            : [b, a]

          return byAmount(first, second) || byName(first, second)
        })
        state.sortedBy = sort
        break
      }
      case 'byName': {
        const sort = currentSort === 'BY_NAME_ASC' ? 'BY_NAME_DESC' : 'BY_NAME_ASC'
        state.costs = state.costs.sort((a, b) => {
          const [first, second] = sort === 'BY_NAME_ASC'
            ? [a, b]
            : [b, a]

          return byName(first, second) || byAmount(first, second)
        })
        state.sortedBy = sort
        break
      }
      }
    },
  },
})

const getRoot = createSelector((state: StoreState) => state.money, root => root)
const getTotalMoney = createSelector(getRoot, root => root.total)
const getCategories = createSelector(getRoot, root => root.categories || {})
const getCategoriesArray = createSelector(getCategories, categories => Object.values(categories))
const getCosts = createSelector(getRoot, root => {
  return root.costs.map(cost => ({
    id: cost.id,
    name: cost.name,
    amount: cost.amount,
    category: cost.categoryId ? root?.categories[cost.categoryId] : null,
  }))
})
const getCostsSum = createSelector(getCosts, (costs) => costs.reduce((acc, cost) => acc += cost.amount, 0))
const getCostsSumByDefaultCategory = createSelector(getCosts, (costs) => costs.reduce((acc, cost) => {
  if (cost.category?.id !== DEFAULT_CATEGORY_ID) {
    return acc
  }

  return acc + cost.amount
}, 0))
const getTotalMoneyCalculated = createSelector(getTotalMoney, getCostsSum, (total, costsSum) => (total || 0) - costsSum)
const getAppMode = createSelector(getTotalMoney, (total): EAppMoneyMode => total === null
  ? EAppMoneyMode.BUDGET_MODE 
  : EAppMoneyMode.SALARY_MODE
)
const getSortedBy = createSelector(getRoot, root => root.sortedBy)
const isCostsEmpty = createSelector(getCosts, costs => costs.length === 0)
const hasCostWithDefaultCategory = createSelector(getCosts, costs => costs.some(cost => cost.category?.id === DEFAULT_CATEGORY_ID))

export default money

const moneyReducer = money.reducer
const moneyActions = money.actions
const moneySelectors = {
  getRoot,
  getTotalMoney,
  getCosts,
  getCostsSum,
  getCostsSumByDefaultCategory,
  getTotalMoneyCalculated,
  getCategories,
  getCategoriesArray,
  getAppMode,
  getSortedBy,
  isCostsEmpty,
  hasCostWithDefaultCategory,
}

export {
  moneyReducer,
  moneyActions,
  moneySelectors
}