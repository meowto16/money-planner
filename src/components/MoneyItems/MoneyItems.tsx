import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import {
  Box, Collapse,
  Stack,
  Typography
} from '@mui/material'

import AddMoneyItem from './components/AddMoneyItem/AddMoneyItem'
import MoneyItem from './components/MoneyItem/MoneyItem'

import { MAX_INPUT_MONEY_LENGTH } from '../../config'
import { CostsItemId, Money, moneyActions, moneySelectors } from '../../store/money.slice'
import { StoreState } from '../../store/store'

import * as S from './MoneyItems.styled'

const MoneyItems = () => {
  const dispatch = useDispatch()
  const { costs, isCostsEmpty } = useSelector((state: StoreState) => ({
    costs: moneySelectors.getCosts(state),
    isCostsEmpty: moneySelectors.isCostsEmpty(state),
  }))

  const handleChangeItemName = ({ id, name }: { id: CostsItemId, name: string }) => {
    dispatch(moneyActions.changeCostsItem({
      id,
      name,
    }))
  }

  const handleChangeItemAmount = ({ id, amount }: { id: CostsItemId, amount: Money }) => {
    if (typeof amount !== 'number') return
    if (amount < 0) return
    if (amount.toString().length >= MAX_INPUT_MONEY_LENGTH) return

    dispatch(moneyActions.changeCostsItem({
      id,
      amount,
    }))
  }

  const handleDeleteItem = (id: CostsItemId) => {
    dispatch(moneyActions.removeCostsItem(id))
  }

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()

    dispatch(moneyActions.addCostsItem())
  }


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
                    onChangeName={handleChangeItemName}
                    onChangeAmount={handleChangeItemAmount}
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