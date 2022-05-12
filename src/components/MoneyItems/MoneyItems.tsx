import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Typography
} from '@mui/material'

import { CostsItemId, Money, moneyActions, moneySelectors } from '../../store/money.slice'
import AddMoneyItem from './components/AddMoneyItem/AddMoneyItem'
import MoneyItem from './components/MoneyItem/MoneyItem'

import { MAX_INPUT_MONEY_LENGTH } from '../../config'

const MoneyItems = () => {
  const dispatch = useDispatch()
  const costs = useSelector(moneySelectors.getCosts)

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
    <Box>
      <Stack sx={{ width: '100%' }} spacing={3}>
        <Box>
          {!costs?.length && <Typography>Еще не распланировано ни одного расхода</Typography>}
          {!!costs?.length && (
            <form onSubmit={handleSubmit}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {costs.map((cost, i) => (
                  <MoneyItem
                    key={cost.id}
                    id={cost.id}
                    placeholder={`Расход №${i + 1}`}
                    name={cost.name}
                    amount={cost.amount}
                    onChangeName={handleChangeItemName}
                    onChangeAmount={handleChangeItemAmount}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </Stack>
              <input type="submit" hidden />
            </form>
          )}
        </Box>
        <Box>
          <AddMoneyItem />
        </Box>
      </Stack>
    </Box>
  )
}

export default MoneyItems