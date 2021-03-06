import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import RestartAltIcon from '@mui/icons-material/RestartAlt'
import EditIcon from '@mui/icons-material/Edit'

import { EAppMoneyMode, moneyActions, moneySelectors } from '../../../../store/money.slice'
import numberFormat, { numberUnformat } from '../../../../utils/numberFormat'
import { MAX_INPUT_MONEY_LENGTH } from '../../../../config'
import { StoreState } from '../../../../store/store'
import HorizontalSwipe, { SwipeHandler } from '../../../../components/HorizontalSwipe/HorizontalSwipe'
import {
  SWIPE_LEFT_MONEY_TOTAL_MIN_DISTANCE,
  SWIPE_RIGHT_MONEY_TOTAL_MIN_DISTANCE,
  SWIPE_TRANSITION_DELAY_MS,
} from './constants'

import * as S from './MoneyTotal.styled'

const MoneyTotal = () => {
  const [isTotalMoneyEditable, setIsTotalMoneyEditable] = useState(false)
  const moneyTotalRef = useRef<HTMLInputElement>()
  const dispatch = useDispatch()

  const {
    totalMoney,
    totalMoneyCalculated,
    moneySpent,
    appMode,
    haveCostsSumByDefaultCategory,
    costsSumByDefaultCategory 
  } = useSelector((state: StoreState) => ({
    totalMoney: moneySelectors.getTotalMoney(state),
    totalMoneyCalculated: moneySelectors.getTotalMoneyCalculated(state),
    haveCostsSumByDefaultCategory: moneySelectors.hasCostWithDefaultCategory(state),
    costsSumByDefaultCategory: moneySelectors.getCostsSumByDefaultCategory(state),
    moneySpent: moneySelectors.getCostsSum(state),
    appMode: moneySelectors.getAppMode(state),
  }))

  const handleChangeMoneyTotal: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    if (value.length >= MAX_INPUT_MONEY_LENGTH) {
      return
    }

    dispatch(moneyActions.setTotal(numberUnformat(value) || 0))
  }

  const handleSwipeLeftMoneyTotal: SwipeHandler = (e, diff) => {
    if (diff >= SWIPE_LEFT_MONEY_TOTAL_MIN_DISTANCE) {
      dispatch(moneyActions.resetTotal())
    }
  }

  const handleSwipeRightMoneyTotal: SwipeHandler = (e, diff) => {
    if (diff >= SWIPE_RIGHT_MONEY_TOTAL_MIN_DISTANCE) {
      setIsTotalMoneyEditable(true)
    }
  }

  useEffect(() => {
    isTotalMoneyEditable && setTimeout(() => {
      moneyTotalRef.current?.focus()
    }, SWIPE_TRANSITION_DELAY_MS + 20)
  }, [isTotalMoneyEditable])

  const moneyTotalValue = isTotalMoneyEditable
    ? numberFormat.format(totalMoney || 0)
    : appMode === EAppMoneyMode.BUDGET_MODE 
      ? '???? ??????????????????????'
      : numberFormat.format(totalMoney || 0) + ' ??????.'

  return (
    <S.MoneyTotalContainer>
      <Stack sx={{ width: '100%' }} spacing={1}>
        <HorizontalSwipe onSwipeLeft={handleSwipeLeftMoneyTotal} onSwipeRight={handleSwipeRightMoneyTotal}>
          {({ handleTouchStart, handleTouchMove, handleTouchEnd, isSwiping, swipeDistance }) => (
            <S.MoneyTotal
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(${-swipeDistance}px)`,
                transition: !isSwiping ? `${SWIPE_TRANSITION_DELAY_MS}ms ease-in transform` : undefined,
              }}
            >
              <S.MoneyTotalEditIcon style={{
                opacity: `${-swipeDistance / SWIPE_RIGHT_MONEY_TOTAL_MIN_DISTANCE}`,
                transition: !isSwiping ? `${SWIPE_TRANSITION_DELAY_MS}ms ease-in opacity` : undefined,
              }}>
                <EditIcon />
              </S.MoneyTotalEditIcon>
              <TextField
                fullWidth
                inputProps={{ inputMode: 'numeric' }}
                label={`?????????? ?????????? (${appMode === EAppMoneyMode.SALARY_MODE ? '?????????? ????????????????' : '?????????? ??????????????'})`}
                value={moneyTotalValue}
                inputRef={moneyTotalRef}
                onChange={handleChangeMoneyTotal}
                onBlur={() => setIsTotalMoneyEditable(false)}
                disabled={!isTotalMoneyEditable}
                size="small"
              />
              <S.MoneyTotalResetIcon style={{
                opacity: `${swipeDistance / SWIPE_LEFT_MONEY_TOTAL_MIN_DISTANCE}`,
                transition: !isSwiping ? `${SWIPE_TRANSITION_DELAY_MS}ms ease-in opacity` : undefined,
              }}>
                <RestartAltIcon />
              </S.MoneyTotalResetIcon>
            </S.MoneyTotal>
          )}
        </HorizontalSwipe>
        {appMode === EAppMoneyMode.SALARY_MODE && (
          <Alert severity={totalMoneyCalculated < 0 ? 'error' : 'info'} icon={false}>
              ???????????????? ??????????: {typeof totalMoneyCalculated === 'number'
              ? `${numberFormat.format(totalMoneyCalculated)} ??????.`
              : '???? ??????????????'}
          </Alert>
        )}
        <Alert severity={appMode === EAppMoneyMode.SALARY_MODE && totalMoneyCalculated < 0 ? 'error' : 'info'} icon={false}>
          ?????????????????? ??????????: {typeof moneySpent === 'number'
            ? `${numberFormat.format(moneySpent)} ??????.`
            : '???? ??????????????'}
        </Alert>
        {haveCostsSumByDefaultCategory && (
          <Alert 
            severity="warning" 
            icon={false} 
            action={
              <Button
                onClick={() => dispatch(moneyActions.removeCategoriesFromAllCosts())}
                color="inherit"
                size="small">
                ????????????????
              </Button>
            }
          >
              ?????????? ???? ??????????????????: {typeof costsSumByDefaultCategory === 'number'
              ? `${numberFormat.format(costsSumByDefaultCategory)} ??????.`
              : '???? ??????????????'}
          </Alert>
        )}
      </Stack>
    </S.MoneyTotalContainer>
  )
}

export default MoneyTotal