import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import { Box, Collapse, Stack, Typography } from '@mui/material'

import AddMoneyItem from './components/AddMoneyItem/AddMoneyItem'
import MoneyItem from './components/MoneyItem/MoneyItem'

import { getPercentStep } from './constants'

import { MAX_INPUT_MONEY_LENGTH } from '../../../../config'
import {
  CostsItemId,
  DEFAULT_CATEGORY_ID,
  EAppMoneyMode,
  Money,
  moneyActions,
  moneySelectors
} from '../../../../store/money.slice'
import { StoreState } from '../../../../store/store'

import * as S from './MoneyItems.styled'

const MoneyItems = () => {
  const dispatch = useDispatch()
  const { appMode, costs, costsSum, isCostsEmpty, total } = useSelector((state: StoreState) => ({
    appMode: moneySelectors.getAppMode(state),
    costs: moneySelectors.getCosts(state),
    costsSum: moneySelectors.getCostsSum(state),
    isCostsEmpty: moneySelectors.isCostsEmpty(state),
    total: moneySelectors.getTotalMoney(state),
  }))
  const totalMoney = total || 1

  const handleChangeItemName = useCallback(({ id, name }: { id: CostsItemId, name: string }) => {
    dispatch(moneyActions.changeCostsItem({
      id,
      name,
    }))
  }, [])

  const handleChangeItemAmount = useCallback(({ id, amount }: { id: CostsItemId, amount: Money }) => {
    if (typeof amount !== 'number') return
    if (amount < 0) return
    if (amount.toString().length >= MAX_INPUT_MONEY_LENGTH) return

    dispatch(moneyActions.changeCostsItem({
      id,
      amount,
    }))
  }, [])

  const handleChangePercent = useCallback(({ id, percent }: { id: CostsItemId, amount: Money, percent: number }) => {
    if (appMode === EAppMoneyMode.SALARY_MODE) {
      const calculated = totalMoney * percent / 100
      const step = getPercentStep(totalMoney)

      dispatch(moneyActions.changeCostsItem({
        id,
        amount: Math.round(calculated / step) * step
      }))
    }
  }, [appMode])

  const handleDeleteItem = useCallback((id: CostsItemId) => {
    dispatch(moneyActions.removeCostsItem(id))
  }, [])

  const handleToggleCategory = useCallback((id: CostsItemId, haveCategory: boolean) => {
    dispatch(
      haveCategory
        ? moneyActions.changeCostsItem({ id, categoryId: null })
        : moneyActions.addDefaultCategoryToCost(id)
    )
  }, [])

  const handleSubmit: React.FormEventHandler = useCallback((event) => {
    event.preventDefault()

    dispatch(moneyActions.addCostsItem())
  }, [])

  return (
    <S.MoneyItems>
      <Stack sx={{ width: '100%' }} spacing={3}>
        <Box>
          {isCostsEmpty && <Typography>Еще не распланировано ни одного расхода</Typography>}
          {!isCostsEmpty && <form onSubmit={handleSubmit}>
            <TransitionGroup>
              {costs.map((cost, i) => (
                <Collapse key={cost.id} className="MoneyItem">
                  <MoneyItem
                    id={cost.id}
                    placeholder={`Расход №${i + 1}`}
                    name={cost.name}
                    amount={cost.amount}
                    percent={appMode === EAppMoneyMode.SALARY_MODE
                      ? (cost.amount / totalMoney * 100)
                      : (cost.amount / (costsSum || 1) * 100)
                    }
                    haveCategory={cost.category?.id === DEFAULT_CATEGORY_ID}
                    onToggleCategory={handleToggleCategory}
                    onChangeName={handleChangeItemName}
                    onChangeAmount={handleChangeItemAmount}
                    onChangePercent={handleChangePercent}
                    onDelete={handleDeleteItem}
                  />
                </Collapse>
              ))}
            </TransitionGroup>
            <input type="submit" hidden />
          </form>}
        </Box>
        <Box>
          <AddMoneyItem />
        </Box>
      </Stack>
    </S.MoneyItems>
  )
}

export default MoneyItems