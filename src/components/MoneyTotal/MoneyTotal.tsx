import React from 'react'
import { Alert, Box, Stack } from '@mui/material'
import { useSelector } from 'react-redux'

import { moneySelectors } from '../../store/money.slice'
import numberFormat from '../../utils/numberFormat'

const MoneyTotal = () => {
  const totalMoneyCalculated = useSelector(moneySelectors.getTotalMoneyCalculated)
  const moneySpent = useSelector(moneySelectors.getCostsSum)

  return (
    <Box>
      <Stack sx={{ width: '100%' }} spacing={1}>
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