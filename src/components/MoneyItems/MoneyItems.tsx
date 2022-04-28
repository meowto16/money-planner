import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material'

import { CostsItemId, Money, moneyActions, moneySelectors } from '../../store/money.slice'
import AddMoneyItem from './components/AddMoneyItem/AddMoneyItem'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DeleteIcon from '@mui/icons-material/Delete'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'

import numberFormat from '../../utils/numberFormat'
import { MAX_INPUT_MONEY_LENGTH } from '../../config'

const MoneyItemName = styled(TextField)({
  '& .MuiInput-root:before, & .MuiInput-root:after': {
    borderBottom: 'none'
  },
  '& .MuiInputAdornment-root': {
    paddingBottom: '4px',
  }
})

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

  return (
    <Box>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Box>
          {!costs?.length && <Typography>Еще не распланировано ни одного расхода</Typography>}
          {!!costs?.length && (
            <Stack sx={{ width: '100%' }} spacing={3}>
              {costs.map(cost => (
                <Box width="100%" key={cost.id} border="1px solid #eee" borderRadius="3px" p={2}>
                  <Box width="100%" mb={1}>
                    <MoneyItemName
                      onChange={(e) => {
                        handleChangeItemName({
                          id: cost.id,
                          name: e.target.value
                        })
                      }}
                      value={cost.name}
                      variant="standard"
                      placeholder="Введите название"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArrowCircleRightIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment
                            onClick={() => handleDeleteItem(cost.id)}
                            position="end">
                            <DeleteIcon color="error" />
                          </InputAdornment>
                        )
                      }}
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box width="100%">
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyRubleIcon />
                          </InputAdornment>)
                      }}
                      inputProps={{ inputMode: 'numeric' }}
                      onChange={(e) => {
                        handleChangeItemAmount({
                          id: cost.id,
                          amount: +e.target.value.replace(/[^0-9]/g, '')
                        })
                      }}
                      value={cost.amount === 0 ? '' : numberFormat.format(cost.amount)}
                      variant="standard"
                      size="small"
                      fullWidth
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
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