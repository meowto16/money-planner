import { Box, styled } from '@mui/material'

export const MoneyItems = styled(Box)({
  '& .MoneyItem': {
    marginBottom: '12px'
  },
  '& .MoneyItem:last-child': {
    marginBottom: 'unset'
  },
})