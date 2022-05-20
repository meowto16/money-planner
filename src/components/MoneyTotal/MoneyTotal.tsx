import React, { useState } from 'react'
import { Alert, Box, InputAdornment, Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'

import { moneySelectors, moneyActions } from '../../store/money.slice'
import numberFormat, { numberUnformat } from '../../utils/numberFormat'
import { MAX_INPUT_MONEY_LENGTH } from '../../config'

const MoneyTotal = () => {
  const [isTotalMoneyEditable, setIsTotalMoneyEditable] = useState(false)
  const dispatch = useDispatch()

  const totalMoney = useSelector(moneySelectors.getTotalMoney)
  const totalMoneyCalculated = useSelector(moneySelectors.getTotalMoneyCalculated)
  const moneySpent = useSelector(moneySelectors.getCostsSum)

  const handleChangeMoneyTotal: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    if (value.length >= MAX_INPUT_MONEY_LENGTH) {
      return
    }

    dispatch(moneyActions.setTotal(numberUnformat(value) || 0))
  }

  return (
    <Box>
      <Stack sx={{ width: '100%' }} spacing={1}>
        <TextField
          inputProps={{ inputMode: 'numeric' }}
          label="Всего денег"
          value={isTotalMoneyEditable
            ? numberFormat.format(totalMoney || 0)
            : numberFormat.format(totalMoney || 0) + ' руб.'
          }
          onChange={handleChangeMoneyTotal}
          disabled={!isTotalMoneyEditable}
          size="small"
          title={!isTotalMoneyEditable ? 'Режим редактирования отключен. Можно включить по кнопке справа' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end" 
                onClick={() => setIsTotalMoneyEditable(prev => !prev)} 
                title={`${isTotalMoneyEditable ? 'Отключить' : 'Включить'} редактирование цены`}
                style={{ cursor: 'pointer' }}
              >
                {isTotalMoneyEditable ? <EditOffIcon color="primary" /> : <EditIcon />}
              </InputAdornment>
            )
          }}
        />
        <Alert severity={totalMoneyCalculated < 0 ? 'error' : 'info'} icon={false}>
          Остается денег: {typeof totalMoneyCalculated === 'number'
            ? `${numberFormat.format(totalMoneyCalculated)} руб.`
            : 'Не указано'}
        </Alert>
        <Alert severity={totalMoneyCalculated < 0 ? 'error' : 'info'} icon={false}>
          Потрачено денег: {typeof moneySpent === 'number'
            ? `${numberFormat.format(moneySpent)} руб.`
            : 'Не указано'}
        </Alert>
      </Stack>
    </Box>
  )
}

export default MoneyTotal